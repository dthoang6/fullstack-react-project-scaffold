import mongoose from 'mongoose'

// Define and export a function that will initialize the database connection
export function initDatabase() {
  // define DATABASE_URL to point to our local MongoDB instance running via Docker and specify blog as a database name
  //const DATABASE_URL = 'mongodb://localhost:27017/blog'
  const DATABASE_URL = process.env.DATABASE_URL
  // add a listener to the open event on the Mongoose connection so that we can show a log message once we are connected to the database
  mongoose.connection.on('open', () => {
    console.info('successfully connected to database:', DATABASE_URL)
  })

  // use mongoose.connect() function to connect to our MongoDB database and return the connection object
  const connection = mongoose.connect(DATABASE_URL)
  return connection
}
