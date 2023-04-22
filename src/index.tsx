import App from 'app/App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from 'app/store/store'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const rerenderEntireTree = () => {
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}

rerenderEntireTree()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', () => {
    rerenderEntireTree()
  })
}
export { useAppDispatch } from 'common/hooks/useAppDispatch'
