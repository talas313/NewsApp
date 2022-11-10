import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { updateUser } from "../actions/users"

const EditUser = () => {
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
  const [status, setStatus] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const user = useSelector((state) => (id ? state.users.find(u => u.id.toString() === id) : null))

  useEffect(() => {
    setUsername(user.username)
    setRole(user.role)
    setStatus(user.status)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = { username: username, role: role, status: status }

    dispatch(updateUser(id, data, navigate))
  }

  return(
    <form onSubmit={handleSubmit}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-5 text-uppercase">Edit user</h2>
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control bg-dark text-white" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    <label>Username</label>
                  </div>
                  <select class="form-select bg-dark text-white mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option selected>{user.role}</option>
                    <option>{user.role === 'user' ? 'admin' : 'user'}</option>
                  </select>
                  <select class="form-select bg-dark text-white mb-5" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option selected>{user.status}</option>
                    <option>{user.status === 'aktivan' ? 'neaktivan' : 'aktivan'}</option>
                  </select>
                  <button class="btn btn-outline-light btn-lg px-5" type="submit">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>    
  )
}

export default EditUser