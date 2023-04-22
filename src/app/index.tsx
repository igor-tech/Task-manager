import * as appSelectors from 'common/selectors/app-selectors/selectors'
import { slice as appSlice } from './app-reducer'

const appReducer = appSlice.reducer
export { appSelectors, appReducer }
