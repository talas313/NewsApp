import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"

import { deleteComment, getComments, postComment } from "../actions/comments"
import { getOneNews } from "../actions/news"

const NewsDetails = () => {
  const [news, setNews] = useState("")  
  const [comment, setComment] = useState("")
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const location = useLocation()

  const { id } = useParams()

  const n = useSelector((state) => (id ? state.news.find(n => n.id !== undefined ? n.id.toString() === id : getOneNews(id)) : null))

  const comments = useSelector((state) => state.comments)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  useEffect(() => {
    setNews(n)

    dispatch(getComments(id))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = { comment: comment, newsId: news.id, userId : user.data[0].id}

    dispatch(postComment(data))

    dispatch(getComments(id))

    setComment("")
  }

  return(
    <div class="container pt-5">
      <h1>{news.title}<br></br></h1>
      <div class="row">
        <div class="col-md-8">
          <img class="img-fluid" src={news.imageURL} alt="" />
        </div>
        <div class="col-md-4">
          <p>{news.description}</p>
        </div>
      </div>
      <div class="row mt-5 w-50">
        <h4>Comments</h4>
        {user ? (
          <form onSubmit={handleSubmit}>
            <div class="container row py-4">
              <input type="textarea" class="form-control w-75" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
              <button class="btn btn-outline-success w-auto ms-5" type="submit">Add</button>
            </div>
          </form>
        ) : (
          <></>
        )}
        {comments.map((comment) => (
          <div class="container row py-2">
            <div class="w-75">
              <p><b>{comment.username}:</b> {comment.comment}</p>
            </div>
            <div class="w-auto ms-4">
              {user && user.data && user.data[0].role === "admin" ? (
                <button class="btn btn-outline-danger" onClick={() => { dispatch(deleteComment(comment.id)) }}>Delete</button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsDetails