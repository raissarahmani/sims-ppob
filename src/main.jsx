import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './styles/tailwind.css'
import Router from './Router'
import ReduxProvider from './redux/ReduxProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>,
)
