import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { setNotification } from "./reducers/notificationReducer"
import { useDispatch, useSelector } from 'react-redux'
import loginService from './services/login'
import storage from './utils/storage'
import { initializeBlogs } from './reducers/blogsReducer'
import { addBlog } from './reducers/blogsReducer'
import { addLike } from './reducers/blogsReducer'
import { removeBlog } from './reducers/blogsReducer'
import { initializeUser, setUser } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/UserPage'
import { initUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

//styles
import Container from '@material-ui/core/Container'
import {
  Button,
  TextField, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
import UserPage from './components/UserPage'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
     //haetaan storagesta user muuttujaan
    dispatch(initializeUser) //dispatsataan user storeen
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

 const users = useSelector(state => state.users)

  const user = useSelector(state => state.user)

  const notifyWith = (message, messageType='success') => {
    dispatch(setNotification({
      message, messageType
    }))
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(setUser(user))
      notifyWith(`${user.name} welcome back!`, 'success')
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = (blog) => {
    dispatch(addBlog(blog))
  }

  const handleLike = (id) => {
   dispatch(addLike(id))
  }

  const handleRemove = (blog) => {
    dispatch(removeBlog(blog))
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    storage.logoutUser()
  }

  const buttonStyle = {
    marginTop: "30px"
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification/>

        <form onSubmit={handleLogin}>
          <div>
            <TextField label ="username"
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField label="password"
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button style ={buttonStyle} variant="contained" color ="secondary" type="submit" id='login'>
          login</Button>
        </form>
      </div>
    )
  }


  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <Container>
      <div>
        <h2>blogs</h2>

        <Notification/>

        <p>
          {user.name} logged in <Button onClick={handleLogout}>logout</Button>
        </p>

        <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
          <NewBlog createBlog={createBlog} notifyWith={notifyWith} />
        </Togglable>


    <TableContainer component={Paper}>
      <Table>
        <TableBody>
        {blogs.sort(byLikes).map(blog => (
          <TableRow key={blog.id}>
            <TableCell>
              <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleRemove={handleRemove}
              own={user.username===blog.user.username}
             />
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Users/>
    {users.map(u => (
      <UserPage id={u.id}user={u} users={users} />
    ))}
      </div>
    </Container>
  )
}

export default App