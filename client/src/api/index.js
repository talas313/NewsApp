import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3001'})

api.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) 
    req.headers.Autorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`

  return req
})

export const getComments = (id) => api.get(`/comments/${id}`)
export const postComment = (comment) => api.post("/comments", comment)
export const deleteComment = (id) => api.delete(`/comments/${id}`)

export const getNews = () => api.get("/news")
export const getOneNews = (id) => api.get(`/news/${id}`)
export const postNews = (news) => api.post("/news", news)
export const updateNews = (id, updatedNews) => api.patch(`/news/${id}`, updatedNews)
export const deleteNews = (id) => api.delete(`/news/${id}`)

export const getUsers = () => api.get("/users")
export const registerUser = (user) => api.post("/users/register", user)
export const loginUser = (user) => api.post("/users/login", user)
export const updateUser = (id, updatedUser) => api.patch(`/users/${id}`, updatedUser)
export const deleteUser = (id) => api.delete(`/users/${id}`)