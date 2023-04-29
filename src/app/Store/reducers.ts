import { appReducer } from 'app/index'
import { authReducer } from 'features/Auth/auth-reducer'
import { tasksReducer, todolistsReducer } from 'features/Todolists-list'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})
