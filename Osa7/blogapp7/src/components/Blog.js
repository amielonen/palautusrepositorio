import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'

  const like = () => {
    handleLike(blog.id)
  }

  const likeStyle = {
    color: "green",
    margin: "10px"
  }


  return (
    <Box component="span" m={2}>
      <div>
        <i>{blog.title}</i> by {blog.author}
        <Button style={{float: 'right'}}
          onClick={() => setVisible(!visible)}>
          {label}
          </Button>
      </div>
      {visible&&(
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <Button variant="outlined" style={likeStyle} onClick={like}>like</Button>
          </div>
          <div>{blog.user.name}</div>
          {own&&<Button variant="outlined" margin="10px" color="secondary" onClick={() => handleRemove(blog)}>remove</Button>}
        </div>
      )}
    </Box>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog