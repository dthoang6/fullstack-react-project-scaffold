import mongoose, { Schema } from 'mongoose'
//Goal: Define the data structure and model for blog posts

// Define a new schema for posts: title, author, contents, some tags associated with the post.

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    contents: String,
    tags: [String], //string array
  },
  { timestamps: true },
)

// create a Mongoose Model Post by using the mongoose.model() function.
// first argument is the name of collection
// then we can use our Model to create posts, to query posts
export const Post = mongoose.model('post', postSchema)

// Registering a model named "post" -> "posts" use it as the collection name in MongoDB, and we need to specify the name of the document in singular form.

// Returning a class-like object Post that lets you create, read, update, and delete documents in this "posts" collection
/**
 * //create new post
 * const newPost = new Post({
  title: 'Hello',
  author: 'Me',
  contents: 'This is a blog post.',
  tags: ['blog', 'mongoose']
})
await newPost.save()

//Collection interface
await Post.find()              // get all posts
await Post.findById(id)        // get a single post by id
await Post.findOne({ title })  // get the first match
await Post.updateOne(...)      // update
await Post.deleteOne(...)      // delete

 */
