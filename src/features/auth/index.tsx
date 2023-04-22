import * as authSelectors from './selectors'
import { Login } from './Login'
import { authThunks } from './auth-reducer'
import { slice } from './auth-reducer'
const authActions = {
  ...authThunks,
  ...slice.actions,
}
const authReducer = slice.reducer

export { authActions, authSelectors, Login, authReducer }
