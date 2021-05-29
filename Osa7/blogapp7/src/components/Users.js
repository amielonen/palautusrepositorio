import React from 'react'
import { initUsers } from '../reducers/usersReducer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const Users = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initUsers())
      }, [dispatch])

    const users = useSelector(state => state.users)
    console.log(users)
    return (
        <div>
            <h2>Users</h2>
            <p><b>blogs created</b></p>
            <ul>
                {users.map(user => 
                  <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name} </Link>
                    <p>
                    {user.blogs.length}
                    </p>
                  </li>
                )}
            </ul>
        </div>
    )
}

export default Users