import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import ReactGPT  from './ReactGPT.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactGPT />
  </React.StrictMode>,
)
