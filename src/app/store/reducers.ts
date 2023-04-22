import { appReducer } from 'app/index'
import { authReducer } from 'features/auth'
import { tasksReducer, todolistsReducer } from 'features/todolists-list'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})
