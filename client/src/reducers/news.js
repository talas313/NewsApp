import { FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE } from '../constants/actionTypes.js'

export default (news = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case FETCH_ONE:
      return action.payload
    case CREATE:
      return [...news, action.payload]
    case UPDATE:
      return news.map((oneNews) => (oneNews.id === action.payload.id ? action.payload : oneNews))
    case DELETE:
      return news.filter((oneNews) => oneNews.id !== action.payload)
    default:
      return news
  }
}