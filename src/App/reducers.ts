import {combineReducers} from 'redux';
import {tasksReducer, todolistsReducer} from '../features/TodolistsList';
import {appReducer} from './index';
import {authReducer} from '../features/Auth';

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})