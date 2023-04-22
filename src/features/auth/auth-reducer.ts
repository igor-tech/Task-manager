import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authAPI, LoginParamsType } from 'features/todolists-list/todolists-api'
import { setAppStatus } from 'app/app-reducer'
import { ThunkErrorType } from 'app/store'
import { AxiosError } from 'axios'
import { handleAsyncServerAppError, handleAsyncServerNetworkError } from 'common/utils'

const login = createAsyncThunk<undefined, LoginParamsType, ThunkErrorType>('auth/login', async (data, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
    } else {
      return handleAsyncServerAppError(res.data, thunkAPI)
    }
  } catch (err) {
    return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
  }
})
const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
    } else {
      return handleAsyncServerAppError(res.data, thunkAPI)
    }
  } catch (err) {
    return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
  }
})
export const asyncActions = {
  logout,
  login,
}

export const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isLoggedIn = action.payload.value
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false
      })
  },
})

export const { setIsLoggedIn } = slice.actions
