import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api';

import {Dispatch} from 'redux';
import {AppRootStateType} from '../../App/store';
import {setAppStatusAC} from '../../App/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState = {} as { [key: string]: Array<TaskType> }

export type TasksStateType = typeof initialState

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState as TasksStateType,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{taskId: string, todolistId: string}>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks.splice(index, 1)
        },
        addTaskAC: (state, action: PayloadAction<{task: TaskType}>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC: (state, action:PayloadAction<{taskId: string, model: UpdateDomainTaskModelType, todolistId: string}>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload.model}
        },
        setTasksAC: (state, action:PayloadAction<{tasks: Array<TaskType>, todolistId: string}>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        })
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC,(state, action) => {
            delete state[action.payload.id]
        })
    }
})

export const tasksReducer = tasksSlice.reducer
export const {setTasksAC,removeTaskAC,updateTaskAC,addTaskAC} = tasksSlice.actions

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC({tasks: res.data.items, todolistId: todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteTaskTC = (taskId: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC({taskId,todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })


}
export const updateTaskTC = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => (dispatch:  ThunkDispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === id)
    if (!task) {
        console.warn('task not found in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: TaskPriorities.Low,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel
    }
    todolistsAPI.updateTask(todolistId, id, apiModel)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC({taskId: id, todolistId: todolistId,model: apiModel}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}

// types



export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ThunkDispatch = Dispatch