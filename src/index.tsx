import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import App from '@/app/App'
import { store } from '@/app/Store/store'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './styles/index.scss'

const root = createRoot(document.getElementById('root') as HTMLElement)

const rerenderEntireTree = () => {
  root.render(
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  )
}

rerenderEntireTree()
