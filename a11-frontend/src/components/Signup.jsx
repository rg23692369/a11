import React, { useState } from 'react'

export default function Signup({ api, onToken }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    setMsg('')
    try {
      const res = await fetch((api || '') + '/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Signup failed')
      onToken(data.token)
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} /></div>
        <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button>Sign up</button>
      </form>
      {msg && <p style={{color:'red'}}>{msg}</p>}
    </div>
  )
}
