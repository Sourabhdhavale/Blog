const express = require('express')
const db = require('../db')
const utils = require('../utils')
const config = require('../config')

const router = express.Router()

router.post('/register', (request, response) => {
  const { name, email, password, phone } = request.body
  const statement = `insert into user (name, email, password, phone) values (?, ?, ?, ?);`
  db.pool.execute(
    statement,
    [name, email, password, phone],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  )
})

router.post('/login', (request, response) => {
  const { email, password } = request.body;
  const statement = `select id, name, phone from user where email = ? and password = ?`
  db.pool.query(statement, [email, password], (error, users) => {
    if (error) {
      response.send(utils.createErrorResult(error))
    }
    else {
      response.send(utils.createSuccessResult(users));
    }
  }
  )
})

// router.get('/showCategories', (request, response) => {
//   const statement = `select id, title, description from category;`
//   db.pool.query(statement, (error, categories) => {
//     response.send(utils.createResult(error, categories))
//   })
// })

module.exports = router
