import {v1} from 'uuid';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api';
import {TasksStateType} from '../App';
import {Dispatch} from 'redux';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    status: TaskStatuses
    todolistId: string,
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string
    todolistId: string,
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filtered = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filtered
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId] = [{
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }, ...tasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            return stateCopy
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return stateCopy
        }
        case 'ADD-TODOLIST' : {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks

            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, todolistId, status}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType=> {
    return {type: 'SET-TASKS', tasks, todolistId}
}


export const fetchTasksTC = (todolistId:string) => {

     return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })

    }
}