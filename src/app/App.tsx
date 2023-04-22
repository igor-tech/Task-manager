import { Header } from 'app/header/Header'
import { Routing } from 'app/routing/Routing'
import { ErrorSnackbar } from 'common/components'
import { CircularLoader } from 'common/components/Loader/CircularLoader'
import { useActions } from 'common/utils'
import React, { useEffect } from 'react'
import { appActions, appSelectors } from './index'
import { useAppSelector } from './store'

function App() {
  const isInitialized = useAppSelector(appSelectors.selectIsInitialized)
  const { initializedApp } = useActions(appActions)

  useEffect(() => {
    if (!isInitialized) initializedApp()
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
