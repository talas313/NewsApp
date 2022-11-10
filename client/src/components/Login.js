import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { loginUser } from "../actions/users"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = { username: username, password: password }

    dispatch(loginUser(data, navigate))
  }

  return(
    <form onSubmit={handleSubmit}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-5 text-uppercase">Login</h2>
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control bg-dark text-white" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    <label>Username</label>
                  </div>
                  <div class="form-floating mb-5">
                    <input type="password" class="form-control bg-dark text-white" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <label>Password</label>
                  </div>
                  <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                </div>
                <div>
                  <p class="mb-0">Don't have an account? <a href="/register" class="text-white-50 fw-bold">Register</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>    
  )
}

export default Login