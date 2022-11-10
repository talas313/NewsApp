import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import NewsDetails from './components/NewsDetails'
import AddNews from './components/AddNews'
import EditNews from './components/EditNews'
import Users from './components/Users'
import EditUser from './components/EditUser'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
			<Routes>
				<Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/news/:id' element={<NewsDetails/>} />
        <Route path='/news/add' element={<AddNews/>} />
        <Route path='/news/edit/:id' element={<EditNews/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/users/edit/:id' element={<EditUser/>} />
			</Routes>
		</BrowserRouter>
  )
}

export default App