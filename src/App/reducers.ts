import { appReducer } from 'App/index'
import { authReducer } from 'features/Auth'
import { tasksReducer, todolistsReducer } from 'features/TodolistsList'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})
