import { useEffect } from 'react'

import { ToastContainer } from 'react-toastify'

import { Routing } from '@/app/Route-pages/Routing'
import { CircularLoader, ErrorSnackbar, Header } from '@/common/components'
import { useActions, useAppSelector } from '@/common/hooks'
import { selectIsInitialized } from '@/common/selectors'
import { authThunks } from '@/features/Auth'

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
