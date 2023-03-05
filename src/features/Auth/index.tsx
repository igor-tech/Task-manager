import * as authSelectors from './selectors'
import {Login} from './Login'
import {asyncActions} from './auth-reducer';
import {slice} from './auth-reducer';
const authActions = {
    ...asyncActions,
    ...slice.actions
}
const authReducer = slice.reducer

export {
    authActions,
    authSelectors,
    Login,
    authReducer

}