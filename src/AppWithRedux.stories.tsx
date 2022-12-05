import {action} from '@storybook/addon-actions';
import AppWithRedux from './AppWithRedux';
import {store} from './State/store';
import {Provider} from 'react-redux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}