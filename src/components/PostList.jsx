import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post.jsx'

export function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((post) => (
        //<Post {...post} key={post.__id} />
        <Fragment key={post.__id}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}
PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}

/**
 * We return the Post component for each post, and pass all the keys from the post object to the component as props.
 *
 * We do this by using the spread syntax, which has the same effect as listing all the keys from the object mannually as props.
 * <Post {...post} /> is equal to <Post title={post.title} author={post.author} />
 *
 * If we are rendering a list of elements, we have to give each element a unique key prop. React uses this key prop to efficiently compute the difference between two lists when the data has changed.
 *
 * - The key prop always has to be added to the uppermost parent element that is rendered within the map function.
 *
 * We use the map function, which applies a function to all the elements of an array.
 *
 * - We using the PropTypes.shape() to defines an object prop type.
 *
 * - using Fragment to implement the horizaltal like after each blog post without an additional <div> container element.
 * - React Fragment is used to group multiple elements without adding extra nodes to the DOM. It's an alternative to wrapping multiple JSX elements in a div
 *
 * - PropTypes is used to validate props at runtime in JavaScript.
 *
 *
 */
