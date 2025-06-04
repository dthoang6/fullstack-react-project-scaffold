import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

// The initDatabase() is an async function, so we need to await it, otherwise, we would be attempting to access the database before we are connected to it
await initDatabase()

// Create a new blog post by calling new Post(), defining some example data
/* const post = new Post({
  title: 'Hello World',
  author: 'Dat Hoang',
  contents: 'This post is stored in a MongoDB database using Mongoose.',
  tags: ['mongoose', 'mongodb'],
})
 */
// save the blog post to database
//await post.save()

//Update the created blog post by using the findBy IdandUpdate method
await Post.findByIdAndUpdate('682e316b6a6595243cab60ff', {
  $set: { title: 'Hello again, Mongoose!' },
})

// use .find() to list all posts and log the result
const posts = await Post.find()

console.log(posts)
