import { AppRootStateType } from 'app/Store/store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
