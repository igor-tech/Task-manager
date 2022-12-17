import {authAPI, LoginParamsType, TaskType, todolistsAPI} from '../../api/todolists-api';
import {setTasksAC, TasksStateType} from '../TodolistsList/tasks-reducer';
import {Dispatch} from 'redux';
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../App/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {addTodolistAC} from '../TodolistsList/todolists-reducer';


const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state:InitialStateType = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)



// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
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
}
// types
type InitialStateType = {
    isLoggedIn: boolean
}

type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>


type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>