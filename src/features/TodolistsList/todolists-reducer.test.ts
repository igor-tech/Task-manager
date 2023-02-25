
import {v1} from 'uuid'
import {RequestStatusType} from '../../App/app-reducer';
import {
    addTodolist,
    changeTodolistEntityStatus,
    changeTodolistFilter, changeTodolistTitle, fetchTodolists,
    FilterValuesType, removeTodolist, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'}
    ]

})


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolist.fulfilled({id: todolistId1}, '', todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'

    let todolist = {
        title: newTodolistTitle,
        id: 'asf',
        order: 0,
        addedDate: ''
    };
    const endState = todolistsReducer(startState, addTodolist.fulfilled({todolist: todolist},
        '',newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')

})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    let changeArg = {title: newTodolistTitle, id: todolistId2};
    const action = changeTodolistTitle.fulfilled(changeArg, 'requestId', changeArg)


    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'

    const action = changeTodolistFilter({id: todolistId2, filter: newFilter})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set to the state', () => {

    const action = fetchTodolists.fulfilled({todolists: startState}, '')


    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {

    let newStatus: RequestStatusType = 'loading'

    const action = changeTodolistEntityStatus({status: newStatus, id: todolistId2})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})