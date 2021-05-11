const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Paras blogi',
        author: 'Blogi Blogittaja',
        url: 'http//:www.moro.fi',
        likes: 12
    },
    {
        title: 'Kok bloc',
        author: 'Kokkari Bloggari',
        url: 'http//:www.blogi123.fi',
        likes: 123
    },
    {
        title: 'Huonoin blogi',
        author: 'Blogi Blogittaja',
        url: 'http//:www.poro.fi',
        likes: 1
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'Poistetaan',
    author: 'authori123',
    url: 'ei oo',
    likes: 2
   })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}