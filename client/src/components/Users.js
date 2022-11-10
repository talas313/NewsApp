import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteUser, getUsers } from "../actions/users"

const Users = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector((state) => state.users)
  
  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return(
    <div class="container pt-5">
      <table class="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map( user => user.role === "admin" ? ( <></> ) : (
            <tr>
              <th>{user.id}</th>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td class="d-flex justify-content-end">
                <button class="btn btn-outline-primary buttons me-4" onClick={() => { navigate(`/users/edit/${user.id}`) }}>Edit</button>
                <button class="btn btn-outline-danger" onClick={() => { dispatch(deleteUser(user.id)) }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
    </div>
  )
}

export default Users