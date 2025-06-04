import { app } from './app.js'
import { initDatabase } from './db/init.js'
import dotenv from 'dotenv'

dotenv.config()

//const PORT = 3000
//const PORT = process.env.PORT
//app.listen(PORT)
//console.info(`express server running on http://localhost:${PORT}`)

try {
  await initDatabase()
  const PORT = process.env.PORT
  app.listen(PORT)
  console.info(`express server running on http://localhost:${PORT}`)
} catch (err) {
  console.error('error connecting to database:', err)
}

/**
 * npm run start
 * 
 * successfully connected to database: mongodb://localhost:27017/blog
 * express server running on http://localhost:3000
 * 
 * running datase using docker: 
docker run -i -t ubuntu:24.04 /bin/bash
uname -a
exit
-
docker ps
docker run -d --name dbserver -p 27017:27017 --restart unless-stopped monggo

mongosh mongodb://localhost:27017/ch2

 */
