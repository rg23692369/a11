import React, { useState, useEffect } from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'

const API = import.meta.env.VITE_API_URL || '';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('a11_token') || '')
  useEffect(() => {
    if (token) localStorage.setItem('a11_token', token)
    else localStorage.removeItem('a11_token')
  }, [token])

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>a11 — Auth Demo</h1>
      {!token ? (
        <>
          <Signup api={API} onToken={setToken} />
          <hr />
          <Login api={API} onToken={setToken} />
        </>
      ) : (
        <Profile api={API} token={token} onLogout={() => setToken('')} />
      )}
    </div>
  )
}
