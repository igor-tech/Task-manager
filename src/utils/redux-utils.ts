import {ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../App/store';

export const useAppDispatch: () => AppDispatch = useDispatch
export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useAppDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}