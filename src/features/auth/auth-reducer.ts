import { createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { handleAsyncServerAppError, handleAsyncServerNetworkError } from 'common/utils'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { authAPI, LoginParamsType } from 'features/todolists-list/todolists-api'

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/login', async (data, thunkAPI) => {
  try {
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true }
    } else {
      return handleAsyncServerAppError(res.data, thunkAPI)
    }
  } catch (err) {
    return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
  }
})
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }>('auth/logout', async (_, thunkAPI) => {
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      return { isLoggedIn: false }
    } else {
      return handleAsyncServerAppError(res.data, thunkAPI)
    }
  } catch (err) {
    return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
  }
})
const initializedApp = createAppAsyncThunk<{ isLoggedIn: boolean }>('app/initializeApp', async (arg, thunkAPI) => {
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true }
    } else {
      return handleAsyncServerAppError(res.data, thunkAPI)
    }
  } catch (err) {
    return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
  }
})

export const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(initializedApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

export const authThunks = { logout, login, initializedApp }
