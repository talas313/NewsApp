import express from "express"
import{
  getComments,
  postComment,
  deleteComment
} from "../controllers/comments.js"

import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/:id", getComments)
router.post("/", auth, postComment)
router.delete("/:id", auth, deleteComment)

export default router