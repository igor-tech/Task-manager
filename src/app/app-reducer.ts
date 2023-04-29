import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authThunks } from 'features/Auth/auth-reducer'
import { fetchTodolists } from 'features/Todolists-list/Todolits/todolists-reducer'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  initialized: false,
  isLoadingTodo: false,
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.initializedApp.fulfilled, (state) => {
        state.initialized = true
        state.status = 'succeeded'
      })
      .addCase(fetchTodolists.fulfilled, (state) => {
        state.isLoadingTodo = true
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded'
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          const { payload, error } = action
          if (payload) {
            if (payload.showGlobalError) {
              state.error = payload.data.messages.length ? payload.data.messages[0] : 'Some error occurred'
            }
          } else {
            state.error = error.message ? error.message : 'Some error occurred'
          }
          state.status = 'failed'
        }
      )
  },
})

export const { setAppStatus, setAppError, setInitialized } = slice.actions
