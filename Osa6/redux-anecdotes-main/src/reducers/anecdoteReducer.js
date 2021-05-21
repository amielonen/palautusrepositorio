import anecdoteService from "../services/anecdoteService"


export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

/*export const vote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}*/

export const vote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    await anecdoteService.update(votedAnecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: { anecdote: votedAnecdote },
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE_ANECDOTE':
      const votedAnecdote = action.data.anecdote
      return state.map(anecdote => 
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote)      
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
  }
    
  return state
}

export default anecdoteReducer