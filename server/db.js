import mysql from "mysql"
import dotenv from 'dotenv'

dotenv.config()

const conn = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
})

export default conn