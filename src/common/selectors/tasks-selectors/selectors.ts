import { AppRootStateType } from 'app/Store/store'

export const selectTasks = (state: AppRootStateType) => state.tasks
