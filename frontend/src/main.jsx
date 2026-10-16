import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AuthGate from './AuthGate.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(<React.StrictMode><AuthGate>{(student, logout) => <App student={student} onLogout={logout} />}</AuthGate></React.StrictMode>)
