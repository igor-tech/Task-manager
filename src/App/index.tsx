import * as appSelectors from './selectors'
import { asyncActions as appActions } from './app-reducer'
import { slice as appSlice } from './app-reducer'

const appReducer = appSlice.reducer
export { appSelectors, appActions, appReducer }
