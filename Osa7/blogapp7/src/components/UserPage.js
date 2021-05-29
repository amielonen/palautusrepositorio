import React from 'react'
import { useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch, Route, Link, useParams
  } from "react-router-dom"

const UserPage = () => {
    const id = useParams().id
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)
    const user = users.find(u => u.id === id)
    if (!user) { return null }
    

  

    const blogsByUser = blogs.filter(blog => blog.user.id === user.id)
    console.log(blogsByUser)
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
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