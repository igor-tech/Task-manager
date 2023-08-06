import { createSlice } from '@reduxjs/toolkit'

import { setInitialized } from '@/app/app-reducer'
import { createAppAsyncThunk } from '@/common/utils/create-app-async-thunk'
import { authAPI, LoginParamsType } from '@/features/Auth/login/service/auth-api'

const login = createAppAsyncThunk<
  { isLoggedIn: boolean; captchaUrl: string | null },
  LoginParamsType
>('auth/login', async (data, { rejectWithValue }) => {
  const res = await authAPI.login(data)

  if (res.data.resultCode === 0) {
    return { isLoggedIn: true, captchaUrl: null }
  } else if (res.data.resultCode === 10) {
    const res = await authAPI.captcha()

    return { isLoggedIn: false, captchaUrl: res.data.url }
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: false })
  }
})
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    const res = await authAPI.logout()

    if (res.data.resultCode === 0) {
      return { isLoggedIn: false }
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true })
    }
  }
)
const initializedApp = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  'app/initializeApp',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    const res = await authAPI.me()

    dispatch(setInitialized(true))
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: false })
    }
  }
)

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: builder => {
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
export const authReducer = slice.reducer
export const authActions = slice.actions
