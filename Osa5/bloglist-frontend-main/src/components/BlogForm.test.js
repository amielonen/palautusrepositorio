import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates blogform and calls its callback funtion', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const testForm = component.container.querySelector('form')


  fireEvent.change(title, {
    target: { value: 'This is a title' },
  })
  fireEvent.change(author, {
    target: { value: 'I am an author' },
  })
  fireEvent.change(url, {
    target: { value: 'this should be an url address' },
  })
  fireEvent.submit(testForm)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is a title')
  expect(createBlog.mock.calls[0][0].author).toBe('I am an author')
  expect(createBlog.mock.calls[0][0].url).toBe('this should be an url address')
})