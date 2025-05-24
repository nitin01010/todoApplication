import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css';
import Home from './home';
import Store from './store/store.js';
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <Home />
    </Provider>
  </StrictMode>,
)
