import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {setAppStatusAC} from '../../App/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState as InitialStateType,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{value: boolean}>) => {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const {setIsLoggedInAC} = authSlice.actions
export const authReducer = authSlice.reducer



// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



