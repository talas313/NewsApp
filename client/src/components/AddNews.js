import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { postNews } from "../actions/news"

const AddNews = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageURL, setImageURL] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = { title: title, description: description, imageURL: imageURL }

    dispatch(postNews(data, navigate))
  }

  return(
    <form onSubmit={handleSubmit}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-5 text-uppercase">Add news</h2>
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control bg-dark text-white" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    <label>Title</label>
                  </div>
                  <div class="form-floating mb-4">
                    <input type="textarea" class="form-control bg-dark text-white" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    <label>Description</label>
                  </div>
                  <div class="form-floating mb-5">
                    <input type="text" class="form-control bg-dark text-white" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required/>
                    <label>Image URL</label>
                  </div>
                  <button class="btn btn-outline-light btn-lg px-5" type="submit">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>    
  )
}

export default AddNews