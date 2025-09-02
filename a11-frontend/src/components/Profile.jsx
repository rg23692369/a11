import React, { useEffect, useState } from 'react'

export default function Profile({ api, token, onLogout }) {
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch((api || '') + '/api/me', {
          headers: { Authorization: 'Bearer ' + token }
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to load profile')
        setUser(data.user)
      } catch (err) {
        setMsg(err.message)
      }
    }
    load()
  }, [api, token])

  return (
    <div>
      <h2>Profile</h2>
      {msg && <p style={{color:'red'}}>{msg}</p>}
      {user ? (
        <div>
          <p>ID: {user._id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : <p>Loading...</p>}
    </div>
  )
}
