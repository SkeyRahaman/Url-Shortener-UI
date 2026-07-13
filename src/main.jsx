import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { BackendStatusProvider } from './context/BackendStatusContext.jsx'
import { AuthProvider } from './features/auth/AuthProvider.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <BackendStatusProvider>
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: { borderRadius: '10px', fontWeight: '600', fontSize: '0.9rem' },
              success: { style: { background: '#1a1d24', color: '#fff', border: '1px solid #22c55e' } },
              error:   { style: { background: '#1a1d24', color: '#fff', border: '1px solid #ef4444' } },
            }}
          />
        </AuthProvider>
      </BackendStatusProvider>
    </BrowserRouter>
  </React.StrictMode>,
)