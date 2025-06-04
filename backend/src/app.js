import express from 'express'
import bodyParser from 'body-parser' // acess the object in req.body
import cors from 'cors' // allow cross requests if different url
import { postsRoutes } from './routes/posts.js'

const app = express()
app.use(cors()) // load the cors plugin as middleware
app.use(bodyParser.json()) // load the body-parser plugin as middleware

// define routes on the Express app
postsRoutes(app)

// //define GET route
// app.get('/', (req, res) => {
//   res.send('Hello from Express!')
// })

export { app }
