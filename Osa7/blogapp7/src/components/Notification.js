import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications.message)

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.messageType === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  if (notification === '') return (
    <div></div>
  )

  return (
    <div style ={style}>
      {notification.message}
    </div>
  )
}

export default Notification
