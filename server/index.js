import express from "express"
import cors from "cors"
import dotenv from 'dotenv'

import commentRoutes from "./routes/comments.js"
import newsRoutes from "./routes/news.js"
import userRoutes from "./routes/users.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT

app.use(express.json({ limit: "30mb",extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.get("/", (req, res) => {
  res.send("Server is running")
})

app.use("/comments", commentRoutes)
app.use("/news", newsRoutes)
app.use("/users", userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
