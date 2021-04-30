import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

    useEffect(() => {
      personService
      .getAll()
      .then(p => {
        setPersons(p)
        setPV(p)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  // lista henkilöiden näyttämiseksi
  const [ personsView, setPV] = useState([...persons])

  const [ newName, setnewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    var found = false;
    const personObject = {
      name: newName,
      number: newNumber
    }
    persons.forEach(element => {
      if (element.name === personObject.name) {
        window.alert(`${personObject.name} is already added to phonebook`)
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
    })
  }


  const removePerson = (personToDelete) => {
    if (window.confirm(`Do you really want do delete ${personToDelete.name} ?` )) {
      personService
      .remove(personToDelete)
      .then(() =>
        setPV(personsView.filter(p => p.id !== personToDelete.id))
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
      <label htmlFor="name">filter shown with</label>
      <SearchFilter search={search} func={handleSearch} />
      <h2>add a new</h2>
      <NewPerson addPerson={addPerson} newName={newName}
      handlenewName={handlenewName} newNumber={newNumber}
      handleNewNumber={handleNewNumber}  />
      <h2>Numbers</h2>
      <Persons pv={personsView} removePerson={removePerson}/>
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
    <p>
      {person.name}: {person.number} <button onClick={remove}>Delete</button>
    </p>
  )
}

const Persons = ({pv, removePerson}) => {
  return (
    <div>
      {pv.map(person => 
        <Person key={person.id} person={person} remove={() =>
        removePerson(person)}/>
      )}
    </div>
  )
}


export default App