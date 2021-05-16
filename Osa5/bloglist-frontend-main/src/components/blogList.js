import React, {useState} from 'react' 
import blogService from '../services/blogs'

const BlogList = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default BlogList