import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
    // lista henkilöiden näyttämiseksi
    const [ personsView, setPV] = useState([...persons])
    const [ newName, setnewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ search, setSearch ] = useState('')
    const [succes, setSuccess] = useState(null)

    useEffect(() => {
      personService
      .getAll()
      .then(p => {
        setPersons(p)
        setPV(p)
      })
  }, [])
  console.log('render', persons.length, 'persons')



  const getPersons = () => {
    personService
    .getAll()
    .then(p => {
      setPersons(p)
      setPV(p)
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    var found = false;
    const personObject = {
      name: newName,
      number: newNumber
    }

    const previous = personsView.find(person => person.name === newName)

    persons.forEach(element => {
      if (element.name === personObject.name) {
        if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?` )) {

        personObject.id = element.id
          personService
          .update(previous.id, personObject)
          .then(getPersons(),
          setSuccess(
            `'${personObject.name}''s nubmer was replaced succesfully`
          ),
          setTimeout(() => {
            setSuccess(null)
          }, 5000)
          )
        }

        found = true
      }
    });
    if (found === true) return
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setPV(persons.concat(returnedPerson))
      setnewName('')
      setNewNumber('')
      setSuccess(`'${personObject.name}' was added successfully`)
      setTimeout(() => {
        setSuccess(null)
      }, 5000);
    })
  }


  const removePerson = (personToDelete) => {
    if (window.confirm(`Do you really want do delete ${personToDelete.name} ?` )) {
      personService
      .remove(personToDelete)
      .then(() =>
        setPV(personsView.filter(p => p.id !== personToDelete.id)),
        setSuccess(
          `Person '${personToDelete.name}' was deleted succesfully`
        ),
        setTimeout(() => {
          setSuccess(null)
        }, 5000)
      )
    }
    return;
  }

  const handlenewName = (event) => {
    setnewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    var personsTemp = persons.filter((person) => person.name.includes(event.target.value))
    setPV(personsTemp)
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={succes}></Notification>
      <label htmlFor="name">filter shown with</label>
      <SearchFilter search={search} func={handleSearch} />
      <h2>add a new</h2>
      <NewPerson addPerson={addPerson} newName={newName}
      handlenewName={handlenewName} newNumber={newNumber}
      handleNewNumber={handleNewNumber}  />
      <h2>Numbers</h2>
      <Persons personsView={personsView} removePerson={removePerson}/>
    </div>
  )
}

const SearchFilter = ({search, func}) => {
  return (
    <input value={search} onChange={func} />
  )
}

const NewPerson = ({addPerson, newName, handlenewName, newNumber, handleNewNumber}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input
          value={newName}
          onChange={handlenewName}/>  
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = ({person, remove}) => {
  return (
    <div>
      {person.name}: {person.number} <button onClick={remove}>Delete</button>
    </div>
  )
}

const Persons = ({personsView, removePerson}) => {
  return (
    <div>
      {personsView.map(person => 
        <Person key={person.id} person={person} remove={() =>
        removePerson(person)}/>
      )}
    </div>
  )
}

const Notification = ({message}) => {
  if (message === null) {return null}

  return (
    <div className="good">
      {message}
    </div>
  )
}


export default App