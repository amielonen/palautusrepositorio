import blogService from '../services/blogs'

export const addBlog = (author, title, url) => {
    return async dispatch => {
        const blogObject = {
            author: author,
            title: title,
            url: url,
        }
        const newBlog = await blogService.create(blogObject)

        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const addLike = (id) => {
    return async (dispatch, getState) => {
        const { blogs } = getState()
        const blogToLike = blogs.find(b => b.id === id)

        const likedBlog = {
            ...blogToLike,
            likes: blogToLike.likes + 1,
           user: blogToLike.user.id,
        }
        await blogService.update(id, likedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: {id: id, blogToLike: blogToLike}
        })
    }
}

export const removeBlog = blogToRemove => {
    return async dispatch => {
        await blogService.remove(blogToRemove.id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: blogToRemove
        })
    }
}


export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

const blogsReducer = (state = [], action) =>  {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'INIT_BLOGS':
            return action.data
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)
        case 'LIKE_BLOG':
            const likedBlog = { ...action.data.blogToLike,
            likes: action.data.blogToLike.likes + 1 };
            return state.map(b => b.id === action.data.id ? likedBlog : b)
        default:
            return state
    }

    return state
}

export default blogsReducer