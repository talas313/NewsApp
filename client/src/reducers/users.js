import { FETCH_ALL, UPDATE, DELETE, AUTH, LOGOUT } from '../constants/actionTypes.js'

export default (users = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action.data }))

      return { ...users }
    case LOGOUT:
      localStorage.clear()

      return{ ...users }
    case UPDATE:
      return users.map((user) => (user.id === action.payload.id ? action.payload : user))
    case DELETE:
      return users.filter((user) => user.id !== action.payload)
    default:
      return users
  }
}