import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { AppRootStateType } from '@/app/Store/store'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
