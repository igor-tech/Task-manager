import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from './reducers'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

export type AppRootStateType = ReturnType<typeof store.getState>

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer)
  })
}

// @ts-ignore
window.store = store
