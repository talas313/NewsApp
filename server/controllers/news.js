import db from "../db.js"

export const getNews = async (req, res) => {
  await db.query(
    "SELECT * FROM news",
    (err, data) => {
      if (err) return console.error(err)

      res.status(200).json(data)
  })
}

export const getOneNews = async (req, res) => {
  const id = req.params.id

  if (!id) return

  await db.query(
    "SELECT * FROM news WHERE id = ?",
    [id],
    (err, data) => {
      if (err) return console.error(err)

      res.status(200).json(data)
  })
}

export const postNews = async (req, res) => {
  if (!req.body) return

  const title = req.body.title
  const description = req.body.description
  const imageURL = req.body.imageURL

  await db.query(
    "INSERT INTO news(title, description, imageURL) VALUES(?,?,?)",
    [title, description, imageURL],
    (err, data) => {
      if (err) return console.error(err)

      res.status(201).json({ status: "success", message: "Article created" })
  })
}

export const updateNews = async (req, res) => {
  if (!req.body) return

  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;

  await db.query(
    "SELECT id FROM news WHERE id = ?",
    [id],
    async (err, data) => {
      if (err) return console.error(err)

      if (data.length === 0) return console.log(`News with id ${id} does not exist`)

      await db.query(
        "UPDATE news SET title = ?, description = ? WHERE id = ?",
        [title, description, id],
        (err, data) => {
          if (err) return console.error(err)

          res.status(200).json({ status: "success", message: "News updated" })
      })
  })
}

export const deleteNews = async (req, res) => {
  const id = req.params.id

  if (!id) return
  
  await db.query(
    "SELECT id FROM news WHERE id = ?",
    [id],
    async (err, data) => {
      if (err) return console.error(err)

      if (data.length === 0) return console.log(`News with id ${id} does not exist`)

      await db.query(
        "DELETE FROM comments WHERE newsId = ?",
        [id],
        async (err, data) => {
          if (err) return console.error(err)

          await db.query(
            "DELETE FROM news WHERE id = ?",
            [id],
            (err, data) => {
              if (err) return console.error(err)
              
              res.status(200).json({ status: "success", message: "News deleted" })
          })            
      })
  })
}