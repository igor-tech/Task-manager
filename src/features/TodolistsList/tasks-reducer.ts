import {TaskPriorities, TaskStatuses, TaskType} from '../../api/todolists-api';
import {createSlice} from '@reduxjs/toolkit';
import {addTask, deleteTask, fetchTasks, updateTask} from './tasks-actions';
import {addTodolist, fetchTodolists, removeTodolist} from './todolists-actions';

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

