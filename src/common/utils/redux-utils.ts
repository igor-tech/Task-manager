import { AppDispatch } from 'app/store'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
  const dispatch = useAppDispatch()

  return useMemo(() => {
    return bindActionCreators(actions, dispatch)
  }, [])
}
