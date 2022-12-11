import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import thunkMiddleware from 'redux-thunk';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
