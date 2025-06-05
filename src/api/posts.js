export const getPosts = async (queryParams) => {
  //this is appended to the url: http://localhost:3000/posts?author=john&page=2
  //queryParams is a JS object passed in, representing query parameters for filtering or pagination
  // make an hhtp GET request to your backend API
  // use JS's native fetch() API
  // Optionally include query parameters
  // return the result as JSON
  // queryParams is plan JS object: {author: 'tom', ...}

  // In Blog.jsx we call: queryFn: () => getPosts() with no queryParams, so the URL becomes: http://localhost:3000/posts?

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams), // converts your queryParams object into a URL encoded query string.
  )
  return await res.json() // waits for the response to finish downloading and parse it as JSON.
}

export const createPost = async (post) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  return await res.json()
}

/**
 * - accept post object as an argument
 * - we make a request to the /posts endpoint
 * - set method to a POST request, pass a header to tell the backend that we will be sending a JSON body, and then send our post object as a JSON string
 * - then parse the response as JSON
 *
 * - after defining the createPost API function, let's use it in the CreatePost component by creating a new mutation hook there.
 */
/**
 * Can Switch to use axios instead of fetch
 * 
 * import axios from 'axios'

export const getPosts = async (queryParams) => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    params: queryParams,
  })
  return res.data
}

export const createPost = async (post) => {
  const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts`, post)
  return res.data
}

Benefits of Axios:
Automatic JSON parsing (no need to call .json())

Cleaner syntax for passing query params and body

Better built-in error handling

Interceptors for handling auth, logging, retries, etc.
 */

//export const updatePost = async (post) => {}

//export const deletePost = async (post) => {}
