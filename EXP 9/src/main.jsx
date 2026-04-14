import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// ── Bootstrap CSS (layout / grid / utilities) ───────────────────────────────
import 'bootstrap/dist/css/bootstrap.min.css'

// ── Global custom styles ─────────────────────────────────────────────────────
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
