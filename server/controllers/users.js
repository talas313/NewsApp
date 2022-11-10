import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import db from "../db.js"

const secret = 'secret'
const salt = 12

export const getUsers = async (req, res) => {
  await db.query(
    "SELECT * FROM users",
    (err, data) => {
      if (err) return console.error(err)

      res.status(200).json(data)
  })
}

export const registerUser = async (req, res) => {
  if (!req.body) return

  const username = req.body.username;
  const password = req.body.password;

  await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, data) => {
      if (err) return console.error(err)

      if (data.length != 0) return console.log("User already exists")

      const hashedPassword = await bcrypt.hash(password, salt)
      
      await db.query(
        "INSERT INTO users(username, password) VALUES(?, ?)",
        [username, hashedPassword],
        (err, data) => {
          if (err) return console.error(err)
          
          const token = jwt.sign({ id: data.insertId }, secret, { expiresIn: '1h' })

          res.status(201).json({ status: "success", message: "User created", token })
      })
  })
}

export const loginUser = async (req, res) => {
  if (!req.body) return

  const username = req.body.username;
  const password = req.body.password;

  await db.query(
    "SELECT * FROM users WHERE username = ?", 
    [username], 
    async (err, data) => {
      if (err) return console.error(err)
      
      if (data.length === 0) return console.log("Wrong username and/or password")
      
      const isPasswordCorrect = await bcrypt.compare(password, data[0].password)

      if (!isPasswordCorrect) return console.log("Wrong username and/or password")
      
      const token = jwt.sign({ id: data.insertId }, secret, { expiresIn: '1h' })

      res.status(200).json({data, token})
  })
}

export const updateUser = async (req, res) => {
  if (!req.body) return

  const id = req.params.id;
  const username = req.body.username;
  const role = req.body.role;
  const status = req.body.status;

  await db.query(
    "SELECT id FROM users WHERE id = ?",
    [id],
    async (err, data) => {
      if (err) return console.error(err)

      if (data.length === 0) return console.log(`User with id ${id} does not exist`)

      await db.query(
        "UPDATE users SET username = ?, role = ?, status = ? WHERE id = ?",
        [username, role, status, id],
        (err, data) => {
          if (err) return console.error(err)

          res.status(200).json({ status: "success", message: "User updated" })
      })
  })
}

export const deleteUser = async (req, res) => {
  const id = req.params.id

  if (!id) return

  await db.query(
    "SELECT id FROM users WHERE id = ?",
    [id],
    async (err, data) => {
      if (err) return console.error(err)

      if (data.length === 0) return console.log(`User with id ${id} does not exist`)

      await db.query(
        "DELETE FROM comments WHERE userId = ?",
        [id],
        async (err, data) => {
          if (err) return console.error(err)
          
          await db.query(
            "DELETE FROM users WHERE id = ?",
            [id],
            (err, data) => {
              if (err) return console.error(err)
              
              res.status(200).json({ status: "success", message: "User deleted" })
          })
      })
  })
} 