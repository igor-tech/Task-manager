import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from '@/app/App'
import { store } from '@/app/Store/store'
import './styles/index.scss'

const root = createRoot(document.getElementById('root') as HTMLElement)

const rerenderEntireTree = () => {
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

rerenderEntireTree()
