import { TasksStateType } from './tasks-reducer'
import { addTodolist, TodolistDomainType } from './todolists-reducer'
import { todolistsReducer, tasksReducer } from './index'

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = addTodolist.fulfilled(
    {
      todolist: {
        title: 'new todolist',
        order: 0,
        id: 'asdf',
        addedDate: '',
      },
    },
    '',
    'new todolist'
  )

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
