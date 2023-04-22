import { Snackbar, Stack } from '@mui/material'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { setAppError, setAppStatus } from 'app/app-reducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import * as React from 'react'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
  const error = useAppSelector((state) => state.app.error)
  const dispatch = useAppDispatch()
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppError({ error: null }))
    dispatch(setAppStatus({ status: 'idle' }))
  }

  const isOpen = error !== null
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }} color={'error'}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
