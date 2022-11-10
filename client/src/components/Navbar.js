import React from 'react'
import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import decode from 'jwt-decode'

import { LOGOUT } from '../constants/actionTypes.js'

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch({ type: LOGOUT })

    navigate('/')

    setUser(null)
  }

  useEffect(() => {
    if(user) {
      const token = user.token

      if (token) {
        const decodedToken = decode(token)

        if (decodedToken.exp * 1000 < new Date().getTime()) logout()
      }
    }
    
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">News</a>
      <form class="container-fluid d-flex justify-content-end">
        {user && user.data && user.data[0].role === "admin" ? (
          <>
            <button class="btn btn-outline-success me-4" onClick={() => { navigate("/news/add") }}>Add News</button>
            <button class="btn btn-outline-info me-4" onClick={() => { navigate("/users") }}>Users</button>
            <button class="btn btn-outline-secondary" onClick={ logout }>Logout</button>
          </>
        ) : user ? (
          <button class="btn btn-outline-secondary" onClick={ logout }>Logout</button>
        ) : (
          <>
            <button class="btn btn-outline-primary me-4" onClick={() => { navigate("/register") }}>Register</button>
            <button class="btn btn-outline-primary" onClick={() => { navigate("/login") }}>Login</button>
          </>
        )}
      </form>
    </div>
    </nav>
  )
}

export default Navbar