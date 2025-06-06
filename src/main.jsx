import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css';
import Home from './home';
import Store from './store/store.js';
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <Home />
      {/* Toast container for notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Provider>
  </StrictMode>,
)
