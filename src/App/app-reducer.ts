
const initialState: InitialStateType = {
    status: 'idle' as RequestStatusType,
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}


// Actions creators
export const setErrorAC = (error: string | null) => ({type:'APP/SET-ERROR', error } as const)
export const setStatusAC = (status: RequestStatusType) => ({type:'APP/SET-STATUS', status } as const)

// types
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetStatusActionType = ReturnType<typeof setStatusAC>
type ActionsType =
    | SetErrorActionType
    | SetStatusActionType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
}

