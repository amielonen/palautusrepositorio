import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog
        user={user}
        removeBlog={mockHandlerRemove}
        updateLikes={mockHandlerUpdate}
        blog={blog}
      />,
    )
  })

  const blog = {
    user: 'Masa Meikalainen',
    likes: 9,
    title: 'titteli',
    author: 'arttu authori',
    url: 'www.urli.com'
  }

  const user = {
    username: 'Maza',
    name: 'Maza Meikalaine'
  }

  const mockHandlerRemove = jest.fn()
  const mockHandlerUpdate = jest.fn()


  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'arttu authori'
    )
    expect(component.container).toHaveTextContent(
      'titteli'
    )

    expect(component.container).not.toHaveStyle(
      'display: none'
    )
  })

  test('shows also likes and url when details pressed', () => {
    const button = component.getByText('show details')
    fireEvent.click(button)
    expect(component.container).not.toHaveStyle(
      'display: none'
    )
  })

  test('eventhandler is called twice if like-button is clicked twice', () => {
    const button = component.getByText('show details')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })
})
