import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAppStatusAC} from '../../App/app-reducer';
import {todolistsAPI} from '../../api/todolists-api';
import {AxiosError} from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {changeTodolistEntityStatus} from './todolists-reducer';

export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (arg, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({})
    }
})
export const removeTodolist = createAsyncThunk('todolists/removeTodolists', async (todolistId: string, {
    rejectWithValue,
    dispatch
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({id: todolistId, status: 'loading'}))
    try {
        await todolistsAPI.deleteTodolists(todolistId)
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {id: todolistId}
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, dispatch)
        dispatch(changeTodolistEntityStatus({id: todolistId, status: 'idle'}))
        return rejectWithValue({})
    }
})
export const addTodolist = createAsyncThunk('todolists/addTodolists', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolists(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolist: res.data.data.item}
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
export const changeTodolistTitle = createAsyncThunk('todolists/changeTodolistsTitle', async (arg: { id: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.updateTodolists(arg.id, arg.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {title: arg.title, id: arg.id}
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