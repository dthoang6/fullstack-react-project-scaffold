import PropTypes from 'prop-types'

export function PostSorting({
  fields = [], // array of strings: ['createdAt', 'updateAt']
  value, // current selected sort field
  onChange, // callback to update sort field
  orderValue, // current selected sort order
  onOrderChange, // callback to update sort order
}) {
  return (
    <div>
      <label htmlFor='sortBy'>Sort By:</label>
      <select
        name='sortBy'
        id='sortBy'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {fields.map((field) => (
          <option value={field} key={field}>
            {field}
          </option>
        ))}
      </select>
      {' / '}
      <label htmlFor='sortOrder'>Sort Order:</label>
      <select
        name='sortOrder'
        id='sortOrder'
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value={'ascending'}>ascending</option>
        <option value={'descending'}>descending</option>
      </select>
    </div>
  )
}
PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
}

// onChange here is a prop, a function passed down from the parent Blog.jsx
/**
 * When the user changes the selected option, React triggers the native onChange event and passes it as e.
 *
 * e.target.value gives us the new value selected by the user
 *
 */
