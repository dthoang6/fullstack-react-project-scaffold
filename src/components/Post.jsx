import PropTypes from 'prop-types'
//import React from 'react'

export function Post({ title, contents, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
    </article>
  )
}
// Define propTypes
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}
/**
 * PropTypes are used to validate the props passed to React components and to ensure that we are passing the correct props when using JavaScript.
 *
 * When using a type-safe language, TypeScript, we can instead do this by directly typing the props passed to the component
 */

//convert the Post Component to TypeScript
// import React from 'react'

// type PostProps = {
//     title: string;
//     contents?: string;
//     author?: string;
// }
// export function PostC({title, contents, author}: PostProps) {
//     ...same
// }
