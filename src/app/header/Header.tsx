import { AppBar, Box, LinearProgress, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { IconButton, Toolbar } from '@mui/material'
import Button from '@mui/material/Button'
import { appSelectors } from 'app/index'
import { useAppSelector } from 'app/store'
import { useActions } from 'common/utils'
import { authActions, authSelectors } from 'features/auth'
import React, { useCallback } from 'react'

export const Header = () => {
  const status = useAppSelector(appSelectors.selectStatus)
  const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
  const { logout } = useActions(authActions)

  const logoutHandler = useCallback(async () => {
    logout()
  }, [])
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
