import { AppBar, Box, CircularProgress, Container, LinearProgress, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { IconButton, Toolbar } from '@mui/material'
import Button from '@mui/material/Button'
import { ErrorSnackbar } from 'common/components'
import { TodolistsList } from 'features/todolists-list'
import React, { useCallback, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useActions } from 'common/utils'
import { authActions, authSelectors, Login } from '../features/auth'
import './App.css'
import { appActions, appSelectors } from './index'
import { useAppSelector } from './store'

function App() {
  const status = useAppSelector(appSelectors.selectStatus)
  const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
  const isInitialized = useAppSelector(appSelectors.selectIsInitialized)
  const { logout } = useActions(authActions)
  const { initializedApp } = useActions(appActions)
  console.log(1)
  useEffect(() => {
    if (!isInitialized) {
      initializedApp()
    }
  }, [])

  const logoutHandler = useCallback(async () => {
    logout()
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className='App'>
      <ErrorSnackbar />
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
      <Container maxWidth={'xl'}>
        <Routes>
          <Route path='/' element={<Navigate to={'/profile'} />} />
          <Route path='/profile' element={<TodolistsList />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
