import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setAppStatusAC} from '../../App/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {AppRootStateType} from '../../App/store';
import {addTodolist, fetchTodolists, removeTodolist} from './todolists-reducer';


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(todolistId)
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {tasks: res.data.items, todolistId: todolistId}
    } catch (error) {
        handleServerNetworkError({message: error as string}, dispatch)
    }
})
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (arg: { taskId: string, todolistId: string }) => {
    await todolistsAPI.deleteTask(arg.todolistId, arg.taskId)
    return {taskId: arg.taskId, todolistId: arg.todolistId}
})
export const addTask = createAsyncThunk('tasks/addTask', async (arg: { title: string, todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(arg.todolistId, arg.title)

        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }

    } catch (err) {

        const error = err as AxiosError
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({})
    }
})
export const updateTask = createAsyncThunk('tasks/updateTask', async (arg: { id: string, domainModel: UpdateDomainTaskModelType, todolistId: string }, {
    dispatch,
    getState,
    rejectWithValue
}) => {

    dispatch(setAppStatusAC({status: 'loading'}))

    const state = getState() as AppRootStateType

    const task = state.tasks[arg.todolistId].find(t => t.id === arg.id)

    if (!task) {
        return rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: TaskPriorities.Low,
        startDate: task.startDate,
        deadline: task.deadline,
        ...arg.domainModel
    }

    try {
        const res = await todolistsAPI.updateTask(arg.todolistId, arg.id, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {taskId: arg.id, todolistId: arg.todolistId, model: apiModel}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({})
    }
})

export const asyncActions = {
    fetchTasks,
    deleteTask,
    addTask,
    updateTask
}

const initialState = {} as { [key: string]: Array<TaskType> }

export type TasksStateType = typeof initialState

const slice = createSlice({
    name: 'tasks',
    initialState: initialState as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        })
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todolistId] = action.payload.tasks
            }
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            const tasks = state[action.payload!.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload!.taskId)
            if (index > -1) tasks.splice(index, 1)
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload.model}
        })
    }
})

export const tasksReducer = slice.reducer

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

