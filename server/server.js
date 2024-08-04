const express = require('express')
const cors = require('cors')
const config = require('./config')
const utils = require('./utils')

const app = express()
app.use(cors())
app.use(express.json())


// add the routes
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const blogRouter = require('./routes/blogs')

app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/blog', blogRouter )

app.listen(4000, '0.0.0.0', () => {
  console.log(`server started on port 4000`)
})
