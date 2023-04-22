import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppRootStateType } from 'app/store/store'
import { AppDispatch } from 'common/hooks/useAppDispatch'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatch
  rejectValue: null | RejectValueType
}>()

export type RejectValueType = {
  data: ResponseType
  showGlobalError: boolean
}
