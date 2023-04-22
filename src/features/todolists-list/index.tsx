import {
  asyncActions as asyncTodolistsActions,
  slice as todolistSlice,
} from 'features/todolists-list/todolits/todolists-reducer'
import { asyncActions as asyncTasksActions, slice as taskSlice } from 'features/todolists-list/tasks/tasks-reducer'
import { TodolistsList } from './TodolistList'

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
