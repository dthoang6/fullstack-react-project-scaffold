import PropTypes from 'prop-types'

export function PostFilter({ field, value, onChange }) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>{field}:</label>
      <input
        type='text'
        name={`filter-${field}`}
        id={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

/**
 * we embed JavaScript in JSX with {...}. {insert variables, function calls, expressions}
 * - cannot use control structures like if, for directly, you use ternaries or map, filter, higher order function.
 *
 * - template literals, backticks, use ${...} to inject JavaScript inside strings to build dynamic string
 */
