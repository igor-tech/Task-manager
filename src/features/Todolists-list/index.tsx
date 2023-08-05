import {
  asyncActions as asyncTasksActions,
  slice as taskSlice,
} from '../Todolists-list/Tasks/tasks-reducer'

import { TodolistsList } from './TodolistList'
import {
  asyncActions as asyncTodolistsActions,
  slice as todolistSlice,
} from './Todolits/todolists-reducer'

const todolistsActions = {
  ...asyncTodolistsActions,
  ...todolistSlice.actions,
}
const tasksActions = {
  ...asyncTasksActions,
}
const tasksReducer = taskSlice.reducer
const todolistsReducer = todolistSlice.reducer

export { todolistsActions, tasksActions, TodolistsList, tasksReducer, todolistsReducer }
