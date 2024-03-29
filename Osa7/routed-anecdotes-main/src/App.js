import React, { useState } from 'react'
import  { useField } from './hooks'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom"
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
       <Nav.Link href="#" as="span">
        <Link style={padding} to="/">anecdotes</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/create">create new</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/about">about</Link>
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
/*
    <div>
      <a href='/' style={padding}>anecdotes</a>
      <a href='/create' style={padding}>create new</a>
      <a href='about' style={padding}>about</a>
    </div>*/
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
      {anecdotes.map(anecdote => 
        <tr key={anecdote.id}>
          <td>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </td>
          <td>
            {anecdote.votes}
          </td>
        </tr>
      )}
      </tbody>
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)



const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const { clear: clearContent, ...content} = useField('text')
  const { clear: clearAuthor, ...author} = useField('text')
  const { clear: clearInfo, ...info} = useField('text')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    props.setNotification(`a new anecdote ${content.value} added`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)
    history.push("/")
  }

  const clearFields = () => {
    clearContent()
    clearAuthor()
    clearInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control {...content}
        />
          <Form.Label>author</Form.Label>
          <Form.Control {...author}
        />
          <Form.Label>info</Form.Label>
          <Form.Control {...info}
        />
        <Button variant="primary" type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
      <button onClick={clearFields}>clear</button>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>{`has ${anecdote.votes}`}</p>
      <p>{`for more info see ${anecdote.info}`}</p>
    </div>
  )
}

const Notification = ({ notification }) => {
  return (
    <div>
    <p>{notification}</p>
  </div>
  )
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  console.log(anecdotes)

  const [notification, setNotification] = useState('')

  const match = useRouteMatch("/anecdotes/:id")
  const anecdote = match ? anecdotes.find((a) => a.id === match.params.id)
  : null

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }


  const anecdoteById = (id) =>
    anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }


  return (
    <div className="container">
        <div>
          <h1>Software anecdotes</h1>
          {(notification &&
            <Alert variant="success">
              {notification}
            </Alert>)}
          <Menu />
        </div>

    <Switch>
      <Route path="/anecdotes/:id">
        <Anecdote anecdote={anecdote} />
      </Route>

      <Route path="/create">
        <CreateNew addNew={addNew} setNotification={setNotification}/>
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/">
        <AnecdoteList anecdotes={anecdotes} />
      </Route>
    </Switch>
    <Footer />
    </div>
  )
}

export default App;