import { configureStore } from '@reduxjs/toolkit'
import { TaskPriorities, TaskStatuses } from 'features/todolists-list/todolists-api'
import { appReducer } from 'app'
import { AppRootStateType } from 'app/store'
import { authReducer } from 'features/auth'
import { tasksReducer, todolistsReducer } from 'features/todolists-list'

import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { v1 } from 'uuid'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {
      id: 'todolistId1',
      title:
        'What to learn asfdddddddddddd dddddddddddddd ddddddddddd ddddddddddd ddddddd dddddddddddddddddddddddddddddddddddddddddddddddddddd',
      filter: 'all',
      order: 0,
      addedDate: '',
      entityStatus: 'idle',
    },
    {
      id: 'todolistId2',
      title: 'What to buy',
      filter: 'all',
      order: 0,
      addedDate: '',
      entityStatus: 'loading',
    },
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: v1(),
        title: 'HTML&CSS',
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
        id: v1(),
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
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Milk',
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
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  },
  app: {
    status: 'succeeded',
    error: null,
    initialized: true,
    isLoadingTodo: false,
  },
  auth: {
    isLoggedIn: true,
  },
}

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <HashRouter>
    <Provider store={storyBookStore}>{storyFn()}</Provider>
  </HashRouter>
)
