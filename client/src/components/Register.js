import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { registerUser } from "../actions/users"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = { username: username, password: password, }

    dispatch(registerUser(data, navigate))
  }

  return(
    <form onSubmit={handleSubmit}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-5 text-uppercase">Register</h2>
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control bg-dark text-white" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label>Username</label>
                  </div>
                  <div class="form-floating mb-5">
                    <input type="password" class="form-control bg-dark text-white" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label>Password</label>
                  </div>
                  <button class="btn btn-outline-light btn-lg px-5" type="submit">Register</button>
                </div>
                <div>
                  <p class="mb-0">Already have an account? <a href="/login" class="text-white-50 fw-bold">login</a>
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

export default Register