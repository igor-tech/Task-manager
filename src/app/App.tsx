import { Routing } from 'app/Route-pages/Routing'
import { ErrorSnackbar, Header } from 'common/components'
import { CircularLoader } from 'common/components/Loader/CircularLoader'
import { useActions } from 'common/hooks'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectIsInitialized } from 'common/selectors'
import { authThunks } from 'features/Auth/auth-reducer'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const isInitialized = useAppSelector(selectIsInitialized)
  const { initializedApp } = useActions(authThunks)

  useEffect(() => {
    if (!isInitialized) initializedApp({})
  }, [])

  if (!isInitialized) return <CircularLoader />

  return (
    <div className="App">
      <ToastContainer />
      <ErrorSnackbar />
      <Header />
      <Routing />
    </div>
  )
}

export default App
