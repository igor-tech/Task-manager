import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {addTaskAC, setTasksAC} from '../features/TodolistsList/tasks-reducer';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';

const initialState: InitialStateType = {
    status: 'idle' as RequestStatusType,
    error: null,
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED' : {
            return {...state, initialized: action.value}
        }
        default:
            return state
    }
}

// thunk
export const initializedAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppInitializedAC(true))
            }
        )

}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })


}


// Actions creators
export const setAppErrorAC = (error: string | null) => ({type:'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type:'APP/SET-STATUS', status } as const)
export const setAppInitializedAC = (value: boolean) => ({type:'APP/SET-INITIALIZED', value } as const)

// types
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedActionType= ReturnType<typeof setAppInitializedAC>
type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
| setAppInitializedActionType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
    initialized: boolean
}

