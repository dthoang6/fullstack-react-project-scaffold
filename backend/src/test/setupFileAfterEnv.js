import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'
import { initDatabase } from '../db/init.js'

//to define a beforeAll function to initialize our database connection in Mongose before all tests run and an afterAll function to disconnect from the database after all tests finish running.

beforeAll(async () => {
  await initDatabase()
})
afterAll(async () => {
  await mongoose.disconnect()
})
