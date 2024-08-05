const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.post('/createBlog', (request, response) => {
    const { title, content, userId, categoryId } = request.body
    const statement = `insert into blogs(title, content, user_id, category_id) values (? ,?, ?, ?);`
  
    db.pool.execute(
      statement,
      [title, content, userId, categoryId],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })

router.put('/editBlog', (request, response) => {
    console.log("edit blog request body: "+JSON.stringify(request.body));
      const { blogId, title , content,categoryId} = request.body
    const statement = `update blogs set title = ?, content = ?, category_id=? where blog_id = ?`;
    console.log(`Updating blog with ID: ${blogId}, Title: ${title}, Content: ${content}, Category ID: ${categoryId}`);


    console.log(`Parameters: [${title}, ${content}, ${categoryId}, ${blogId}]`);
      db.pool.execute(
        statement,
        [title,content,categoryId,blogId],
        (error, result) => {
          console.log("Edit blog response: "+JSON.stringify(result,2));
          response.send(utils.createResult(error, result))
        }
      )
    })

  router.post('/searchBlog', (request, response) => {
    const {title} = request.body
    const statement = `select title, content from blogs where title= ?`
    db.pool.execute(statement, [title], (error, result) => {
      response.send(utils.createResult(error, result));
    })
  })

  
    router.delete('/deleteBlog', (request, response) => {
      console.log("In express delete blog:"+request.query.blogId);
      const statement = `delete from blogs where blog_id = ?`
      db.pool.execute(
        statement,[request.query.blogId],
        (error, result) => {
          console.log("result:"+result);
          response.send(utils.createResult(error, result))
        }
      )
    })


router.get('/getMyBlogs', (request, response) => {
  
  const statement = `select b.blog_id, b.title as blog_title, c.title as category_title from blogs b join categories c on b.category_id = c.category_id where b.user_id = ? order by b.blog_id`
  db.pool.query(statement, [request.query.userId], (error, blogs) => {
    // console.log(blogs);
    response.send(utils.createResult(error, blogs))
  })
})


router.get('/getAllBlogs', (request, response) => {
  const statement = `select b.blog_id, b.title as blog_title, c.title as category_title from blogs b join categories c on b.category_id = c.category_id order by b.blog_id`;
  db.pool.query(statement, (error, categories) => {
    console.log("Get alll blogs in router epxress:"+ categories);
      response.send(utils.createResult(error, categories))
    })
  })

router.get('/getBlogDetails', (request, response) => {
  // console.log(request.query)
  // const statement = `select b.blog_id, b.title as blog_title, b.content,c.title as category_title from blogs b join categories c on b.category_id = c.category_id where b.blog_id=?`;
  const statement = `select blog_id,title,content,category_id from blogs where blog_id=?`;
  db.pool.query(statement, [request.query.blogId], (error, blog) => {
    console.log("blog details:" +blog)
    response.send(utils.createResult(error,blog))
  })
})
  
router.get('/searchBlog', (request, response) => {
  
  const statement = `select b.blog_id, b.title as blog_title, c.title as category_title from blogs b join categories c on b.category_id = c.category_id where b.title LIKE ? order by b.blog_id`
  db.pool.query(statement, [`%${request.query.blogTitle}%`], (error, blogs) => {
    console.log("Get searched blogs in router: " + JSON.stringify(blogs,2));
    console.log("Get searched blogs error in router: "+error);

    response.send(utils.createResult(error, blogs))
  })
})
module.exports = router
