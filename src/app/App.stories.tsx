import { ReduxStoreProviderDecorator } from 'stories/decorators/ReduxStoreProviderDecorator'
import App from './App'

export default {
  title: 'App Base Component',
  component: App,
  decorators: [ReduxStoreProviderDecorator],
}

export const AppBaseExample = () => {
  return <App />
}
