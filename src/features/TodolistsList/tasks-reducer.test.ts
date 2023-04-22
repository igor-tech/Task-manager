import { TaskPriorities, TaskStatuses, TaskType } from 'api/todolists-api'
import { addTask, deleteTask, fetchTasks, updateTask } from './tasks-reducer'

import { addTodolist, fetchTodolists, removeTodolist } from './todolists-reducer'
import { tasksReducer } from './index'

let todolistId1: string
let todolistId2: string
let startState: { [key: string]: Array<TaskType> }

beforeEach(() => {
  todolistId1 = 'todolistId1'
  todolistId2 = 'todolistId2'
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  let param = { taskId: '2', todolistId: todolistId2 }
  const action = deleteTask.fulfilled(param, 'deleteTask', param)

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  })
})

test('correct task should be added to correct array', () => {
  const task = {
    todoListId: todolistId2,
    title: 'juice',
    status: TaskStatuses.New,
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: 0,
    startDate: '',
    id: 'fasd',
  }
  const action = addTask.fulfilled(task, 'requestId', {
    title: 'juice',
    todolistId: todolistId2,
  })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juice')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const model = {
    status: TaskStatuses.New,
    title: '',
    deadline: '',
    startDate: '',
    description: '',
    priority: 0,
  }
  const action = updateTask.fulfilled({ model: model, taskId: '2', todolistId: todolistId2 }, 'requestId', {
    id: '2',
    domainModel: model,
    todolistId: todolistId2,
  })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {
  const model = {
    status: TaskStatuses.New,
    title: 'juice',
    deadline: '',
    startDate: '',
    description: '',
    priority: 0,
  }

  const action = updateTask.fulfilled({ model, taskId: '2', todolistId: todolistId2 }, '', {
    id: '2',
    domainModel: model,
    todolistId: todolistId2,
  })
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].title).toBe('juice')
  expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {
  const action = addTodolist.fulfilled({ todolist: { title: '', addedDate: '', order: 0, id: 'd' } }, '', '')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const action = removeTodolist.fulfilled({ id: 'todolistId2' }, '', 'todolistId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {
  let todolists = [
    { id: todolistId1, title: 'What to learn', order: 0, addedDate: '' },
    { id: todolistId2, title: 'What to buy', order: 0, addedDate: '' },
  ]
  const action = fetchTodolists.fulfilled({ todolists }, 'requestId', undefined)

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState[todolistId1]).toStrictEqual([])
  expect(endState[todolistId2]).toStrictEqual([])
})

test('tasks should be added for todolists', () => {
  const action = fetchTasks.fulfilled(
    {
      tasks: startState['todolistId1'],
      todolistId: 'todolistId1',
    },
    '',
    todolistId1
  )
  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2].length).toBe(0)
})
