import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { RequestStatusType, setAppStatus } from '@/app/app-reducer'
import { ThunkErrorType } from '@/common/types'
import {
  handleAsyncServerAppError,
  handleAsyncServerNetworkError,
} from '@/common/utils/error-utils'
import { authThunks as asyncAuthAction } from '@/features/Auth/auth-reducer'
import { todolistsAPI, TodolistType } from '@/features/Todolists-list/todolists-api'

export const fetchTodolists = createAsyncThunk<
  { todolists: TodolistType[] },
  undefined,
  ThunkErrorType
>('todolists/fetchTodolists', async (arg, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await todolistsAPI.getTodolists()

    thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))

    return { todolists: res.data }
  } catch (err) {
    return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
  }
})
export const removeTodolist = createAsyncThunk<{ id: string }, string, ThunkErrorType>(
  'todolists/removeTodolists',
  async (todolistId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
    thunkAPI.dispatch(changeTodolistEntityStatus({ id: todolistId, status: 'loading' }))
    try {
      await todolistsAPI.deleteTodolists(todolistId)
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))

      return { id: todolistId }
    } catch (err) {
      thunkAPI.dispatch(changeTodolistEntityStatus({ id: todolistId, status: 'idle' }))

      return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
    }
  }
)
export const addTodolist = createAsyncThunk<{ todolist: TodolistType }, string, ThunkErrorType>(
  'todolists/addTodolists',
  async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await todolistsAPI.createTodolists(title)

      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))

        return { todolist: res.data.data.item }
      } else {
        return handleAsyncServerAppError(res.data, thunkAPI, false)
      }
    } catch (err) {
      return handleAsyncServerNetworkError(err as AxiosError, thunkAPI, false)
    }
  }
)
export const changeTodolistTitle = createAsyncThunk<
  { title: string; id: string },
  { id: string; title: string },
  ThunkErrorType
>('todolists/changeTodolistsTitle', async (arg, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await todolistsAPI.updateTodolists(arg.id, arg.title)

    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))

      return { title: arg.title, id: arg.id }
    } else {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    }
  } catch (err) {
    return handleAsyncServerNetworkError(err as AxiosError, thunkAPI, false)
  }
})

export const asyncActions = {
  fetchTodolists,
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
}

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
export type FilterValuesType = 'all' | 'active' | 'completed'

export const slice = createSlice({
  name: 'todolist',
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>
    ) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ id: string; status: RequestStatusType }>
    ) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index !== -1) state[index].entityStatus = action.payload.status
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map(tl => ({
          ...tl,
          filter: 'all',
          entityStatus: 'idle',
        }))
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload.id)

        if (index !== -1) state.splice(index, 1)
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todolist,
          filter: 'all',
          entityStatus: 'idle',
        })
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload.id)

        if (index !== -1) state[index].title = action.payload.title
      })

      .addCase(asyncAuthAction.logout.fulfilled, () => {
        return []
      })
  },
})

export const { changeTodolistEntityStatus, changeTodolistFilter } = slice.actions
