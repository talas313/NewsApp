import db from "../db.js"

export const getComments = async (req, res) => {
  const id = req.params.id
  
  await db.query(
    "SELECT comments.id, comments.comment, users.username FROM comments INNER JOIN users ON comments.userId = users.id WHERE comments.newsID = ?",
    [id],
    (err, data) => {
      if (err) return console.error(err)

      res.status(200).json(data)
  })
}

export const postComment = async (req, res) => {
  if (!req.body) return

  const comment = req.body.comment
  const newsId = req.body.newsId
  const userId = req.body.userId

  await db.query(
    "INSERT INTO comments(comment, newsId, userId) VALUES(?,?,?)",
    [comment, newsId, userId],
    (err, data) => {
      if (err) return console.error(err)

      res.status(201).json({ status: "success", message: "Comment added" })
  })
}

export const deleteComment = async (req, res) => {
  const id = req.params.id

  if (!id) return

  await db.query(
    "SELECT id FROM comments WHERE id = ?",
    [id],
    async (err, data) => {
      if (err) return console.error(err)

      if (data.length === 0) return console.log(`Comment with id ${id} does not exist`)

      await db.query(
        "DELETE FROM comments WHERE Id = ?",
        [id],
        (err, data) => {
          if (err) return console.error(err)
          
          res.status(200).json({ status: "success", message: "Comment deleted" })
      })
  })
}