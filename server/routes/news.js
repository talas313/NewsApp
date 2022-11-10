import express from "express"
import{
  getNews,
  getOneNews,
  postNews,
  updateNews,
  deleteNews
} from "../controllers/news.js"

import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/", getNews)
router.get("/:id", getOneNews)
router.post("/", auth, postNews)
router.patch("/:id", auth, updateNews)
router.delete("/:id", auth, deleteNews)

export default router