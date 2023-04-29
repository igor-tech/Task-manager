import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ThunkErrorType } from 'common/types/types'
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from 'features/Todolists-list/todolists-api'
import { setAppStatus } from 'app/app-reducer'
import { AppRootStateType } from 'app/Store/store'
import { AxiosError } from 'axios'
import { handleAsyncServerAppError, handleAsyncServerNetworkError } from 'common/utils'
import { authThunks as asyncAuthAction } from 'features/Auth/auth-reducer'
import { addTodolist, fetchTodolists, removeTodolist } from 'features/Todolists-list/Todolits/todolists-reducer'

export const fetchTasks = createAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string, ThunkErrorType>(
  'tasks/fetchTasks',
  async (todolistId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await todolistsAPI.getTasks(todolistId)
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
      return { tasks: res.data.items, todolistId }
    } catch (err) {
      return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
    }
  }
)
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (arg: { taskId: string; todolistId: string }, thunkAPI) => {
    try {
      await todolistsAPI.deleteTask(arg.todolistId, arg.taskId)
      return { taskId: arg.taskId, todolistId: arg.todolistId }
    } catch (err) {
      return handleAsyncServerNetworkError(err as AxiosError, thunkAPI)
    }
  }
)
export const addTask = createAsyncThunk<TaskType, { title: string; todolistId: string }, ThunkErrorType>(
  'tasks/addTask',
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await todolistsAPI.createTask(arg.todolistId, arg.title)

      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
        return res.data.data.item
      } else {
        return handleAsyncServerAppError(res.data, thunkAPI, false)
      }
    } catch (err) {
      return handleAsyncServerNetworkError(err as AxiosError, thunkAPI, false)
    }
  }
)
export const updateTask = createAsyncThunk<
  { taskId: string; todolistId: string; model: UpdateDomainTaskModelType },
  { id: string; domainModel: UpdateDomainTaskModelType; todolistId: string },
  ThunkErrorType
>('tasks/updateTask', async (arg, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }))

  const state = thunkAPI.getState() as AppRootStateType

  const task = state.tasks[arg.todolistId].find((t) => t.id === arg.id)

  if (!task) {
    return thunkAPI.rejectWithValue({
      errors: ['task not found in the state'],
      fieldsErrors: undefined,
    })
  }
  const apiModel: UpdateTaskModelType = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: TaskPriorities.Low,
    startDate: task.startDate,
    deadline: task.deadline,
    ...arg.domainModel,
  }

  try {
    const res = await todolistsAPI.updateTask(arg.todolistId, arg.id, apiModel)
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }))
      return { taskId: arg.id, todolistId: arg.todolistId, model: apiModel }
    } else {
      return handleAsyncServerAppError(res.data, thunkAPI, false)
    }
  } catch (err) {
    return handleAsyncServerNetworkError(err as AxiosError, thunkAPI, false)
  }
})

export const asyncActions = {
  fetchTasks,
  deleteTask,
  addTask,
  updateTask,
}

const initialState = {} as { [key: string]: Array<TaskType> }

export type TasksStateType = typeof initialState

export const slice = createSlice({
  name: 'tasks',
  initialState: initialState as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        if (action.payload) {
          state[action.payload.todolistId] = action.payload.tasks
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const tasks = state[action.payload!.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload!.taskId)
        if (index > -1) tasks.splice(index, 1)
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.todoListId].unshift(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index > -1) tasks[index] = { ...tasks[index], ...action.payload.model }
      })

      .addCase(asyncAuthAction.logout.fulfilled, () => {
        return {}
      })
  },
})
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
