import React, {useState} from 'react' 
import PropTypes from 'prop-types'

const Blog = ({blog, user, updateLikes, removeBlog}) => {
  const [visible, setVisible] = useState(false)
  const [poster, setPoster] = useState('')
  const [username, setUsername] = useState('')

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const addLike = () => {
  const { id, author, url, title } = blog
  const BlogWithUpdates = {
    user:  blog.user,
    likes: blog.likes + 1,
    title: title,
    author,
    url
  }
  setPoster(poster || blog.user?.name)
  setUsername(username || blog.user?.username)
  updateLikes(id, BlogWithUpdates)
}


const deleteButton = () => {
  if (user.name === blog.user?.name || user.name === poster) {
    return (
      <div>
        <button onClick={deleteBlog}>remove</button>
      </div>
    )
  }
}

const deleteBlog = () => {
  removeBlog(blog)
}

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>show details</button>
        </div>
        <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={addLike}>like</button>
          </p>
          <div>
            {blog.user?.name || poster}
          </div>
          {deleteButton()}
          <button onClick={toggleVisibility}>hide details</button>
        </div>
      </div>
    </div>
  )
}

export default Blog

Blog.propTypes = {
updateLikes: PropTypes.func.isRequired,
removeBlog: PropTypes.func.isRequired
}