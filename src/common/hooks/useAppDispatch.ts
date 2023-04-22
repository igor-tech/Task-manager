import { AppRootStateType } from 'app/store/store'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch: () => AppDispatch = useDispatch