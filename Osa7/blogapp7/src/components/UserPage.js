import React from 'react'
import { useSelector } from 'react-redux'
const UserPage = ({user, users}) => {

    const blogs = useSelector(state => state.blogs)
    console.log(users)
    console.log(blogs)

    const blogsByUser = blogs.filter(blog => blog.user.id === user.id)
    return (
        <div>
            <h2>{user.name}</h2>
            <ul>
            {blogsByUser.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
            )              
        )}
        </ul>
        </div>
        
    )
}

export default UserPage