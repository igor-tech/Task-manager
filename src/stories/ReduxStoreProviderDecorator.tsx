import {AppRootStateType, store} from '../State/store';
import {Provider} from 'react-redux';

import React from 'react'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import {tasksReducer} from '../State/tasks-reducer';
import {todolistsReducer} from '../State/todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed , todoListId: 'todolistId1', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed , todoListId: 'todolistId1', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed , todoListId: 'todolistId2', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'React Book', status: TaskStatuses.Completed , todoListId: 'todolistId2', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()}</Provider>)


