import {todolistSlice} from './todolists-reducer';
import {asyncActions as asyncTodolistsActions} from './todolists-reducer';
import {asyncActions as asyncTasksActions} from './tasks-reducer';

const todolistsActions = {
    ...asyncTodolistsActions,
    ...todolistSlice.actions
}
const tasksActions = {
    ...asyncTasksActions
}
export {
    todolistsActions,
    tasksActions,
}