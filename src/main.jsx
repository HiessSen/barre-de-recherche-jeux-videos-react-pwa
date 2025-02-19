import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './pwa' // Import du fichier de configuration PWA
ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)