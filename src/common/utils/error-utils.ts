import { setAppError, setAppStatus } from 'app/app-reducer'
import { AxiosError } from 'axios'
import { ResponseType } from 'common/types'

type ThunkAPI = {
  dispatch: (action: any) => void
  rejectWithValue: Function
}

export const handleAsyncServerAppError = <D>(
  data: ResponseType<D>,
  thunkAPI: ThunkAPI,
  showError = true
) => {
  const messageError = data.messages.length ? data.messages[0] : 'Some error occurred'
  if (showError) {
    thunkAPI.dispatch(setAppError({ error: messageError }))
  }

  thunkAPI.dispatch(setAppStatus({ status: 'failed' }))
  return thunkAPI.rejectWithValue({
    errors: data.messages,
    fieldsErrors: data.fieldsErrors,
  })
}

export const handleAsyncServerNetworkError = (
  err: AxiosError,
  thunkAPI: ThunkAPI,
  showError = true
) => {
  const error = err as AxiosError
  if (showError) {
    thunkAPI.dispatch(
      setAppError({
        error: error.message ? error.message : 'Some error occurred',
      })
    )
  }
  thunkAPI.dispatch(setAppStatus({ status: 'failed' }))
  return thunkAPI.rejectWithValue({
    errors: [error.message],
    fieldsErrors: undefined,
  })
}
