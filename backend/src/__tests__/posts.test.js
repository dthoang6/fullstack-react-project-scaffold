import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'

import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from '../services/posts.js'
import { Post } from '../db/models/post.js'

// use describe function to define a new test, this function describes a group of tests. we call our group creating posts

describe('creating posts', () => {
  // define a first test by using test function, we pass an async function here to creating posts
  // .toBeInstanceOf() is a Jest matcher function, it checks whether an object is an instance of a given class or constructor
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Mongoose!',
      author: 'Test Author',
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }
    const createdPost = await createPost(post)

    // verify that it returns a post with an ID by using expect() function
    // Make sure that createdPost._id is a valid ObjectId instance, as defined by Mongoose.
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    // Use Mongoose directly to find the post with the given ID
    const foundPost = await Post.findById(createdPost._id)

    expect(foundPost).toEqual(expect.objectContaining(post)) // all post fields match. check that the actual object contains at least these key-value pairs.

    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  // define a sencond test, called creating posts without title should fail as we defined the title to be required, it should not be possible to create a post without title

  test('without title should fail', async () => {
    const post = {
      author: 'Daniel Bugl',
      contents: 'Post with no title',
      tags: ['empty'],
    }
    // Clearner pattern for testing async errors without using try/catch
    //await expect(createPost(post)).rejects.toThrow(mongoose.Error.ValidationError)
    //await expect(createPost(post)).rejects.toThrow('`title` is required')
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  // define a test called creating posts with minimal parameters should succeed and only enter title.
  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

// We need to create an initial state by using the beforeEach function of Jest with some posts in the database to be able to test the list functions
// The initial state may become more sophisticated, it may neccessary to create a user account, then create a blog on the platform, then create blog posts for that blog. We can dot it by create test utility fuctions such as: createTestUser, createTestBlog, createTestPost. and import them in our tests.
//
// Then we can use these functions in beforeEach() across multiple test files instead of manually doing it every single time.

// We can use beforeEach function for a whole test file or only run it for each test inside a describe() group
/**
 * Here's what happens in this setup:

Database Cleanup: await Post.deleteMany({}); clears all existing posts from the database to ensure a clean state for each test.

Data Insertion: The loop iterates over samplePosts, creates new Post instances, saves them to the database, and stores the saved instances in createdSamplePosts. This ensures that each test starts with a consistent set of posts.

 */
const samplePosts = [
  { title: 'Learning React', author: 'Dat Hoang', tags: ['react'] },
  { title: 'Learning React Hook', author: 'Dat Hoang', tags: ['react'] },
  { title: 'Learning Redux', author: 'Dat Hoang', tags: ['redux'] },
  { title: 'Learning TypeScript', author: 'Tom Hoang', tags: ['typescript'] },
]
/**
 * createdSamplePosts is an array of post objects that were inserted into the database during the beforeEach setup.
 */
let createdSamplePosts = []
beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }
})

// define a new test group and write test case for 'listing posts' services
describe('listing posts', () => {
  test('should return all posts', async () => {
    const posts = await listAllPosts()
    expect(posts.length).toEqual(createdSamplePosts.length)
  })

  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts()
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })

  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    )
  })

  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor('Dat Hoang')
    expect(posts.length).toBe(3)
  })

  test('should be able to filter posts by tag', async () => {
    const posts = await listPostsByTag('redux')
    expect(posts.length).toBe(1)
  })
})

// define a test group for getting a post

describe('getting a post', () => {
  test('should return the full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })

  test('should fail if the id does not exist', async () => {
    const post = await getPostById('000000000000000000000000')
    expect(post).toEqual(null)
  })
})

// define a test group for updating a post
describe('updating posts', () => {
  test('should update the specified property', async () => {
    await updatePost(createdSamplePosts[0]._id, { author: 'Test Author' })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.author).toEqual('Test Author')
  })

  test('should not update other properties', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.title).toEqual('Learning React')
  })

  test('should update the updatedAt timestamp', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    )
  })

  test('should fail if the id does not exist', async () => {
    const post = await updatePost('000000000000000000000000', {
      author: 'Test Author',
    })
    expect(post).toEqual(null)
  })
})

// define test group for 'deleting posts
describe('deleting posts', () => {
  test('should remove the post from the database', async () => {
    const result = await deletePost(createdSamplePosts[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(deletedPost).toEqual(null)
  })
  test('should fail if the id does not exist', async () => {
    const result = await deletePost('000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})

/**
 * Writing tests for service functions may be tedious, but it will save us a lot of time in the long run.
 *
 * Adding additional functionality later, such as access control, may change the basic behavior of the service functions.
 *
 * By having the unit tests, we can ensure that we do not break existing behavior when adding new functionality.
 */
