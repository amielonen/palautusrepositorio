import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const notification = props.notifications
  
  let style = {
    border: 'solid',
    borderColor: 'white',
    padding: 10,
    borderWidth: 1
  }

  if (notification === '') {
    style = {
      border: 'solid',
      borderColor: 'white',
      padding: 10,
      borderWidth: 1
    }
  } else {
   style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('käy mapstatetopropsissa')
  return {
    notifications: state.notifications
  }
}


const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification