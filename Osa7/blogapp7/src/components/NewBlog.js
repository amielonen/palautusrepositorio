import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog, createBlog } from '../reducers/blogsReducer'

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
    event.target.author.value = ''
    event.target.title.value = ''
    event.target.url.value = ''

    dispatch(addBlog(author, title, url))
    //setnotification
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          title
          <input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create">create</button>
      </form>
    </div>
  )
}

export default NewBlog