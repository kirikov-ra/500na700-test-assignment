import './src/app/styles/reset.scss';
import './src/app/styles/global.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './src/app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)