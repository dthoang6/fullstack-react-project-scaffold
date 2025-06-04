import { MongoMemoryServer } from 'mongodb-memory-server'

// Define a globalSetup function to create a memory server for MongoDB

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '6.0.4',
    },
  })
  // Store the MongoDB instance as a global variable to be able to access it later in the globalTeardown function
  globalThis.__MONGOINSTANCE = instance

  // Store the URL to connect to our test instance in the DATABASE_URL environment variable
  process.env.DATABASE_URL = instance.getUri()
}
