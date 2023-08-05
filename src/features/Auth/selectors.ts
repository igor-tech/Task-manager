import { AppRootStateType } from '@/app/Store/store'

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
