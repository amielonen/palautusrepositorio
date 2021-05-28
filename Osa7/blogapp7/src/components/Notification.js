import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notifications.message)

  const severity = notification.messageType === 'success' ? 'success' : 'error'


  if (notification === '') return (
    <div></div>
  )

  return (
    <Alert severity={severity}>
      {notification.message}
    </Alert>
  )
}

export default Notification