const { TestScheduler } = require('@jest/core')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
    test('total of bigger list', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

    test('empty', () => {
        const result = listHelper.totalLikes(blogsEmpty)
        expect(result).toBe(0)
    })

    test('of only one blog', () => {
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(7)
    })
})

describe('most likes', () => {
    test('of favourite from bigger list', () => {
        const expected = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        }
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(expected)
    })

    test('of empty blogslist', () => {
        const result = listHelper.favoriteBlog(blogsEmpty)
        expect(result).toEqual(0)
    })
})

describe('most blogs by author', () => {
    test('of most blogs by author in bigger list', () => {
        const expected = {
            author: "Robert C. Martin",
            blogs: 3
        }
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(expected)
    })

    test('of empty bloglist', () => {
        const result = listHelper.mostBlogs(blogsEmpty)
        expect(result).toEqual(0)
    })
})

describe('most likes by author', () => {
    test('of most likes by author in bigger list', () => {
        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(expected)
    })

    test('of empty bloglist', () => {
        const result = listHelper.mostLikes(blogsEmpty)
        expect(result).toEqual(0)
    })
})

const blogsEmpty = []

const oneBlog = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    }
]

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]