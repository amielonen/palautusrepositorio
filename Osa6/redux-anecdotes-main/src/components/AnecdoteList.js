import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const rule = useSelector(state => state.filter)

    const anecdotesToShow = anecdotes.filter(anecdote => 
        anecdote.content.toUpperCase().includes(rule.toUpperCase())
        )

    const voteAnecdote = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`anecdote  ${anecdote.content} voted`, 3000))
    }

    return (
        <div>
            {anecdotesToShow.sort((a,b) => b.votes - a.votes)
            .map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList

      