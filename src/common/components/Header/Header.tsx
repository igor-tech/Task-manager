import { AppBar, Box, LinearProgress, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { IconButton, Toolbar } from '@mui/material'
import Button from '@mui/material/Button'
import { useActions } from 'common/hooks'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectStatus } from 'common/selectors'
import { authThunks } from 'features/Auth/auth-reducer'
import { selectIsLoggedIn } from 'features/Auth/selectors'
import React, { useCallback } from 'react'

export const Header = () => {
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { logout } = useActions(authThunks)

  const logoutHandler = useCallback(async () => logout({}), [])

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <Menu />
          </IconButton>
          <Typography variant='h6' style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
            {isLoggedIn && (
              <Button color='inherit' onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Typography>
        </Toolbar>
        <Box style={{ position: 'absolute', width: '100%', top: '60px' }}>
          {status === 'loading' && <LinearProgress />}
        </Box>
      </AppBar>
    </>
  )
}
