import { FETCH_ALL, CREATE, DELETE } from '../constants/actionTypes.js'

export default (comments = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case CREATE:
      return [...comments, action.payload]
    case DELETE:
      return comments.filter((comment) => comment.id !== action.payload)
    default:
      return comments
  }
}