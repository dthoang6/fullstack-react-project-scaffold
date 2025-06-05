import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { CreatePost } from './components/CreatePost.jsx'
import { PostList } from './components/PostList.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'

//API function that fetches posts from the backend
import { getPosts } from './api/posts.js'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // TanStack handles initial fetch, caching the result, refetching when needed if window refocus, returning data, error, isLoading...
  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }], // unique key for caching and tracking, posts is the ID for this query
    queryFn: () => getPosts({ author, sortBy, sortOrder }), // the async function that fetches data from backend
  })
  // fallback for data: postsQuery.data contains the fetched post list, if data is undefined, it falls back to empty array []
  // ?? nullish coalescing operator is a JS operator used to provide a default value when a variable is null or undefined
  // if postsQuery.data is null or undefined, assign an empty array to posts.
  const posts = postsQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
// onChange={(value) => setSortBy(value)} is a callback to update the sort field in Blog, so the parent updates its state, and re-renders with the new sorting preferences. A way to notify the parent when the user makes changes.

// It keeps the source of state in the parent but allows children to interact with it.
