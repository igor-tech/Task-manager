import {authAPI} from '../api/todolists-api';
import {setIsLoggedIn} from '../features/Auth/auth-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from '../utils/error-utils';
import {fetchTodolists} from '../features/TodolistsList/todolists-reducer';

const initializedApp = createAsyncThunk('app/initializeApp', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedIn({value: true}))

        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err) {
        return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
    } finally {
        thunkAPI.dispatch(setInitialized(true))
    }

})

export const asyncActions = {
    initializedApp,
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    initialized: false,
    isLoadingTodo: false
}
export type InitialStateType = typeof initialState

export const slice = createSlice({
    name: 'app',
    initialState: initialState as InitialStateType,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setInitialized: (state, action: PayloadAction<boolean>) => {
            state.initialized = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializedApp.fulfilled, (state) => {
                state.initialized = true
                state.status = 'succeeded'
            })
            .addCase(fetchTodolists.fulfilled, (state) => {
                state.isLoadingTodo = true
            })

    }
})

export const {setAppStatus, setAppError, setInitialized} = slice.actions



