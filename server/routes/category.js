const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/showCategories', (request, response) => {
  const statement = `select category_id, title, description from categories;`
  db.pool.query(statement, (error, categories) => {
    console.log(categories)

    response.send(utils.createResult(error, categories))
  })
})

router.post('/addCategory', (request, response) => {
  const { title, description } = request.body
  const statement = `insert into categories(title, description) values (?, ?);`

  db.pool.execute(
    statement,
    [title, description],
    (error, result) => {
      console.log("in express category add result:" + result);
      response.send(utils.createResult(error, result))
    }
  )
})

router.delete('/deleteCategory', (request, response) => {
  console.log("deltete requ:" + request.query.categoryId);
  const updateStatement = `UPDATE blogs SET category_id = NULL WHERE category_id = ?`;
  const deleteStatement = 'delete from categories where category_id=?'

  db.pool.execute(updateStatement, [request.query.categoryId], (error, result) => {
    db.pool.execute(deleteStatement, [request.query.categoryId], (error, result) => {
      console.log("Delete Category: "+result);
      response.send(utils.createResult(error, result));
    })
  })
  
})

module.exports = router
