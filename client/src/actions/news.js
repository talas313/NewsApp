import { FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE } from '../constants/actionTypes.js'
import * as api from '../api/index.js'

export const getNews = () => async (dispatch) => {
  try {
    const { data } = await api.getNews()

    dispatch({ type: FETCH_ALL, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const getOneNews = (id) => async (dispatch) => {
  try {
    const { data } = await api.getOneNews(id)

    dispatch({ type: FETCH_ONE, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const postNews = (news, router) => async (dispatch) => {
  try {
    const { data } = await api.postNews(news)

    dispatch({ type: CREATE, payload: data })

    router('/')
  } catch (error) {
    console.error(error)
  }
}

export const updateNews = (id, updatedNews, router) => async (dispatch) => {
  try {
    const { data } = await api.updateNews(id, updatedNews)

    dispatch({ type: UPDATE, payload: data })

    router('/')
  } catch (error) {
    console.error(error)
  }
}

export const deleteNews = (id) => async (dispatch) => {
  try {
    await api.deleteNews(id)
    
    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.error(error)
  }
}