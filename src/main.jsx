import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client'

const entryPoint = document.getElementById('root')

ReactDOM.createRoot(entryPoint).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)