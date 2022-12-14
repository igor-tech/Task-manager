import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../App/app-reducer';
import {ResponseType} from '../api/todolists-api'
import {Dispatch} from 'redux';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppStatusActionType | SetAppErrorActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string},  dispatch: Dispatch<SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}