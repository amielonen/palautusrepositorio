import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAnecdotes } from "../reducers/filterReducer"
import { connect } from 'react-redux'

const Filter = (props) => {

  //const dispatch = useDispatch()

  const handleChange = (event) => {
      event.preventDefault()
      const rule = event.target.value
      props.filterAnecdotes(rule)
  }

  const style = {
    marginBottom: 10
  }



  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterAnecdotes,
}

const connectedFilter = connect(null, mapDispatchToProps)(Filter)
export default connectedFilter