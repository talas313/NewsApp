import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"

import { deleteNews } from "../actions/news"

const News = ({ data }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  
  return (
    <div class="col">
      <div class="card bg-dark text-white">
        <img src={data.imageURL} class="card-img-top" alt="..." onClick={() => { navigate(`news/${data.id}`) }}/>
        <div class="card-body">
          <h5 class="card-title">{data.title}</h5>
          <div class="mt-2 d-flex flex-row justify-content-between">
            {user && user.data && user.data[0].role === "admin" ? (
              <>
                <button class="btn btn-outline-primary buttons" onClick={() => { navigate(`/news/edit/${data.id}`) }}>Edit</button>
                <button class="btn btn-outline-danger" onClick={() => { dispatch(deleteNews(data.id)) }}>Delete</button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default News