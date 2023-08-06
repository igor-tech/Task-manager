import { createAsyncThunk } from '@reduxjs/toolkit'

import { AppRootStateType } from '@/app/Store/store'
import { AppDispatch } from '@/common/hooks/useAppDispatch'
import { ResponseType } from '@/common/types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatch
  rejectValue: null | RejectValueType
}>()

export type RejectValueType = {
  data: ResponseType
  showGlobalError: boolean
}
