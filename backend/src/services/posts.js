import { Post } from '../db/models/post.js'

// 1. Define a new createPost function, which takes an object with title, author, contents, and tags as arguments and creates and returns a new post.

// For security reasons, it is always good practice to have a list of allowed properties instead of simply passing down the whole object to new Post() constructor.

// To test if the createPost function works as expected, we are going to define unit test cases for it using Jest.

export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })
  return await post.save()
}

// 2. Define an internal listPosts function which allows us to query posts, and define a sort order. Then we use this listPosts function to define listAllPosts, listPorstsByAuthor, listPostsByTag functions

// The function accepts a query and an options argument. By default empty object as a query. DRY concept way to build a set of 'list' services on top of Post Model.

// {sortBy = 'createdAt', sortOrder = 'descending'} = {}
// It is a JavaScript object being destructured with default values.
// It expects an objects with optional keys sortBy, and sortOrder.

// If no argument is passed for it, it default to an empty object {}
// Then it destructures that object to get sortBy and sortOrder

async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

// Define a function to list all posts, passes an empty object as query
// The query object is {}, meaning no filter, return all posts
// The sorting options are passed as options.

export async function listAllPosts(options) {
  return await listPosts({}, options)
}

// Define a function to list all posts, by certain author by passing author to the query object
export async function listPostsByAuthor(author, options) {
  return await listPosts({ author }, options)
}

// Define a function to list post by tag
export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

// 3. Define the get single post
export async function getPostById(postId) {
  return await Post.findById(postId)
}

// 4. Define the update post function
export async function updatePost(postId, { title, author, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $set: { title, author, contents, tags } },
    { new: true },
  )
}
// 5. Define the delete post function
export async function deletePost(postId) {
  return await Post.deleteOne({ _id: postId })
}

/**
 * Later, we may want to add some additional restrictions, such as access control.
 *
 * Having the service function allows us to change it only in one place and we do not have to worry about forgetting to add it somewhere.
 *
 * Another benefit is that if we, for example, want to change the database provider later, the developer only needs to worry about getting the service functions working again, and they can be verified with the test cases.
 */
