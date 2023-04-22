import { Header } from 'app/header/Header'
import { Routing } from 'app/routing/Routing'
import { ErrorSnackbar } from 'common/components'
import { CircularLoader } from 'common/components/Loader/CircularLoader'
import { useActions } from 'common/hooks'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectIsInitialized } from 'common/selectors'
import { authThunks } from 'features/auth/auth-reducer'
import React, { useEffect } from 'react'

function App() {
  const isInitialized = useAppSelector(selectIsInitialized)
  const { initializedApp } = useActions(authThunks)

  useEffect(() => {
    if (!isInitialized) initializedApp({})
  }, [])

  if (!isInitialized) return <CircularLoader />

  return (
    <div className='App'>
      <ErrorSnackbar />
      <Header />
      <Routing />
    </div>
  )
}

export default App
