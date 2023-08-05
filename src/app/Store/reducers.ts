import { combineReducers } from 'redux'

import { appReducer } from '@/app'
import { authReducer } from '@/features/Auth'
import { tasksReducer, todolistsReducer } from '@/features/Todolists-list'

export const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})
