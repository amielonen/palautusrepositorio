import React from 'react'
import { initUsers } from '../reducers/usersReducer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
            {users.map(user => (
                <p key={user.id}>{user.name} {user.blogs.length}</p>
            ))}
        </div>
    )
}

export default Users