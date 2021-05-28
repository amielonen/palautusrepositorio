import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog, createBlog } from '../reducers/blogsReducer'
import { Button, TextField } from '@material-ui/core'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const author = event.target.author.value
    const title = event.target.title.value
    const url = event.target.title.value
    /*
    event.target.author.value = ''
    event.target.title.value = ''
    event.target.url.value = ''*/
    setAuthor('')
    setTitle('')
    setUrl('')

    dispatch(addBlog(author, title, url))
    props.notifyWith(`New blog ${title} by ${author} added successfully!`, 'success')
  }

  const buttonStyle = {
    marginTop: 10,
    marginBottom: 10,
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <TextField label="author" 
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField label="title" 
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField label="url" 
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit" style={buttonStyle} variant="contained" color="primary" id="create">create</Button>
      </form>
    </div>
  )
}

export default NewBlog