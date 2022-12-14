import {removeTodolistAC, TodolistDomainType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {v1} from 'uuid';
import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from './app-reducer';

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})


test('correct error message should be set', () => {

    let endState = appReducer(startState, setAppErrorAC('some error'))

    expect(endState.error).toBe('some error')
})
test('correct status should be set', () => {

    let endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading')
})
