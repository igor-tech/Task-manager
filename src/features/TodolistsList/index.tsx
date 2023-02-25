import {todolistSlice} from './todolists-reducer';
import * as tasksActions from './tasks-actions'
import * as todolists from './todolists-actions'

const todolistsActions = {
    ...todolists,
    ...todolistSlice.actions
}
export {
    todolistsActions,
    tasksActions,
}