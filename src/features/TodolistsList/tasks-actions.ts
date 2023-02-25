import {createAsyncThunk} from '@reduxjs/toolkit';
import {TaskPriorities, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api';
import {setAppStatusAC} from '../../App/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {AppRootStateType} from '../../App/store';
import {UpdateDomainTaskModelType} from './tasks-reducer';

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