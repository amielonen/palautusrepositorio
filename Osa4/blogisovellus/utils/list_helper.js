const _ = require('lodash');
const blog = require('../models/blog');
const dummy = (blogs) => {
    return 1;
  }

  const totalLikes = (blogs) => {
      return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

  const favoriteBlog = (blogs) => {
      if (blogs.length === 0) return 0
      let fav = blogs[0]
      for (var i = 1; i < blogs.length; i++) {
          if (blogs[i].likes > fav.likes) fav = blogs[i]
      }
        return {
            title: fav.title,
            author: fav.author,
            likes: fav.likes
        }
  }

  // käydään blogs läpi
  // -> tehdään uutta listaa, johon tulee author ja blogien määrä
  // -> jos listassa jo kys. author lisätään countia
  // mikä nimi esiintyy useiten
  // montako kertaa nimi esiintyy
  const mostBlogs = (blogs) => {
      if (blogs.length === 0) return 0
      let authors = blogs.map(blog => {
          return blog.author
      })
      console.log(authors)

      let blogCountByAuthor = new Array(authors.length).fill(0)
      blogs.forEach(blog => {
          const index = authors.findIndex(author => {
              return author === blog.author
          })
          blogCountByAuthor[index]++
      })

      const mostBlogs = Math.max(...blogCountByAuthor)
      const topAuthor = authors[blogCountByAuthor.findIndex(count => { return count === mostBlogs})]
      console.log(topAuthor)
      console.log(blogCountByAuthor)
      return {author: topAuthor, blogs: mostBlogs}
  }

  const mostLikes = blogs => {
    if (blogs.length === 0) return 0
      let authors = blogs.map(blog => {
          return blog.author
      })

      let likesOfAuthor = new Array(authors.length).fill(0)
      blogs.forEach(blog => {
          const index = authors.findIndex(author => {
              return author === blog.author
          })
          likesOfAuthor[index] += blog.likes
      })

      const mostLikes = Math.max(...likesOfAuthor)
      const bestAuthor = authors[likesOfAuthor.findIndex(likes => {return likes === mostLikes})]

      return {author: bestAuthor, likes: mostLikes}
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }