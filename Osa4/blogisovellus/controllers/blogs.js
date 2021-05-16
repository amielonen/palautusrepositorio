const { request } = require('express')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })

  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json ({ error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const blogLikes = body.likes ? body.likes : 0

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: blogLikes,
      user: user._id
    })

    if (
      blog.title === undefined || blog.url === undefined
    ) { response.status(400).end } 
    
    else {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())
    }


  })

  blogsRouter.get('/:id', async (request, response, next) => {
      const blog = await Blog.findById(request.params.id)
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
  })
  
  blogsRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    if (user.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(200).end()
    }
    else {
      return response.status(401).json ({ error: 'no permission to remove blogs added by other users'})
    }

  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
    response.json(updatedBlog.toJSON())
  })


  module.exports = blogsRouter