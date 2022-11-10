import { FETCH_ALL, UPDATE, DELETE, AUTH } from '../constants/actionTypes.js'
import * as api from '../api/index.js'

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers()

    dispatch({ type: FETCH_ALL, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const registerUser = (user, router) => async (dispatch) => {
  try {
    const { data } = await api.registerUser(user)

    dispatch({ type: AUTH, data })

    router('/')
  } catch (error) {
    console.error(error)
  }
}

export const loginUser = (user, router) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(user)

    dispatch({ type: AUTH, data })

    router('/')
  } catch (error) {
    console.error(error)
  }
}

export const updateUser = (id, updatedUser, router) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, updatedUser)

    dispatch({ type: UPDATE, payload: data })

    router('/users')
  } catch (error) {
    console.error(error)
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id)

    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.error(error)
  }
}