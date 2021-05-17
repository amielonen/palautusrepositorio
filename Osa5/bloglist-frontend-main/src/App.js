import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setErrorMessage(`Logged in as ${username}`)
      setTimeout(() => {
        setErrorMessage('')
      }, 4000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(
        'Error with login request'
      )
      setTimeout(() => {
        setUsername('')
        setPassword('')
        setErrorMessage(null)
      }, 5000)
    }
  }


  const addBlog =  (blogObject) => {
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${blogObject.blogtitle} by ${blogObject.blogauthor} added`)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      }).catch (error => {
        setErrorMessage(
          error.toString()
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="add a blog">
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    )
  }

  const updateLikes = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    const BlogWithUpdates = {
      ...blogObject,
      id
    }
    setBlogs(blogs.map(
      (blog) => (blog.id !== id ? blog : BlogWithUpdates)
    ))
  }

  const removeBlog = async (blog) => {
    const id = blog.id
    blogService.setToken(user.token)

    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      console.log('tulloo tänne asti')
      setBlogs(blogs.filter(
        blog => blog.id !== id
      ))
    }
  }


  const blogList = () => (
    <div>
      {blogs.sort((a,b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} user={user}
            updateLikes={updateLikes} removeBlog={removeBlog} />
        ))}
    </div>
  )

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            id='username'
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )

  const logUserOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={logUserOut}>
          logout
        </button>
      </p>
      {blogForm()}
      {blogList()}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() : blogView()
      }
    </div>
  )
}

export default App