import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const [top, setTop] = useState(0) 

  const vote = () => {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)
    
    var max = points[0];
    var maxIndex = 0;
    for (var i = 0; i < 6; i++) {
      if (copy[i] > max) {
        maxIndex = i;
        max = copy[i];
      }
    }
    setTop(maxIndex)

  }

  const newAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>
    <h1>Anecdote of the day</h1>
    <div>{anecdotes[selected]}</div>
    <p> has {points[selected]} votes </p>
    <Button handleClick={vote} text="vote" />
    <Button handleClick={newAnecdote} text="New anecdote" />
    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[top]}</p>
    <p>has {points[top]} votes</p>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
  <button onClick={handleClick}>{text}</button>
  )
}

export default App