import { FETCH_ALL, CREATE, DELETE } from '../constants/actionTypes.js'
import * as api from '../api/index.js'

export const getComments = (id) => async (dispatch) => {
  try {
    const { data } = await api.getComments(id)

    dispatch({ type: FETCH_ALL, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const postComment = (comment) => async (dispatch) => {
  try {
    const { data } = await api.postComment(comment)
    
    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const deleteComment = (id) => async (dispatch) => {
  try {
    await api.deleteComment(id)

    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.error(error)
  }
}