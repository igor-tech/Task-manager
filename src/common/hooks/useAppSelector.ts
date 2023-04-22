import { AppRootStateType } from 'app/store/store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
