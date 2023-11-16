import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProvidersWrapper	 from './providers/ProvidersWrapper/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ProvidersWrapper>
            <App />
        </ProvidersWrapper>
     </React.StrictMode>,
)
