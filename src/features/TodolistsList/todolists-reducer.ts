import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {RequestStatusType, setAppStatusAC} from '../../App/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TodolistDomainType[] = []


export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
export type FilterValuesType = 'all' | 'active' | 'completed'

export const todolistSlice = createSlice({
    name: 'todolist',
    initialState: initialState as TodolistDomainType[],
    reducers: {
        removeTodolistAC: (state, action:PayloadAction<{id: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        },
        addTodolistAC: (state, action: PayloadAction<{todolist: TodolistType}>) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{id: string, title: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeTodolistFilterAC: (state, action: PayloadAction<{id: string, filter: FilterValuesType}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        setTodolistsAC: (state, action:PayloadAction<{todolists: Array<TodolistType>}>) => {
          return  action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{id: string, status: RequestStatusType}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state[index].entityStatus = action.payload.status
        },
    },


})

export const {changeTodolistEntityStatusAC,changeTodolistFilterAC,changeTodolistTitleAC,removeTodolistAC,addTodolistAC,setTodolistsAC} = todolistSlice.actions
export const todolistsReducer = todolistSlice.reducer


// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    todolistsAPI.deleteTodolists(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC({id: todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'idle'}))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolists(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.updateTodolists(id, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC({title: title, id: id}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}





