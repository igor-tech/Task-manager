import { InitialStateType, setAppError, setAppStatus } from './app-reducer'
import { appReducer } from './index'

let startState: InitialStateType

beforeEach(() => {
  startState = {
    error: null,
    status: 'idle',
    initialized: false,
    isLoadingTodo: false,
  }
})

test('correct error message should be set', () => {
  let endState = appReducer(startState, setAppError({ error: 'some error' }))

  expect(endState.error).toBe('some error')
})
test('correct status should be set', () => {
  let endState = appReducer(startState, setAppStatus({ status: 'loading' }))

  expect(endState.status).toBe('loading')
})
