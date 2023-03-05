import {asyncActions as asyncTodolistsActions, slice as todolistSlice} from './todolists-reducer';
import {asyncActions as asyncTasksActions, slice as taskSlice} from './tasks-reducer';
import {TodolistsList} from './TodolistList'

const todolistsActions = {
    ...asyncTodolistsActions,
    ...todolistSlice.actions
}
const tasksActions = {
    ...asyncTasksActions
}
const tasksReducer = taskSlice.reducer
const todolistsReducer = todolistSlice.reducer
export {
    todolistsActions,
    tasksActions,
    TodolistsList,
    tasksReducer,
    todolistsReducer
}