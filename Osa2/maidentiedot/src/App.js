import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [countriesView, setCV] = useState([...countries])
  const [ccount, setccount] = useState(0)

  useEffect(() => {
    let isMounted = true;
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        if (isMounted) setCountries(response.data);
      })
      return () => {isMounted = false}
  })

  const handleSearch = (event) => {
    event.preventDefault()
    var countriesTemp = countries.filter((country) => country.name.includes(event.target.value))
    setccount(countriesTemp.length)
    setCV(countriesTemp)
    setSearch(event.target.value)
  }

  return (
    <div>
      <p>find countries</p>
      <SearchFilter search={search} func={handleSearch} />
      <Countries countries={countriesView} count={ccount} />
    </div>
  )
}

//=============================//

const Countries = ({countries, count}) => {
  if (count > 10) return (<p></p>)
  if (count === 1) return (
    <div>
      <CountryInfo countries={countries} />
    </div>
  )
  return (
    <div>
      {countries.map((country, i) => <p key={i}>{country.name}</p>)}
    </div>
  )
}


const CountryInfo = ({countries}) => {
  var c = countries[0]
  var languages=c.languages
  return(
    <div>
      <h2>{c.name}</h2>
      <p>capital {c.capital}</p>
      <p>population {c.population}</p>
      <h1>languages</h1>
      <Languages languages={languages}/>
      <div>
      <img src={c.flag} alt="Flag of the nation"></img>
      </div>
      
    </div>
  )

}

const Languages = ({languages}) => {
  return(
  <div>
    <ul>
    {languages.map((language, i) => <li key={i}>{language.name}</li> )}
    </ul>
  </div>
  )

}


const SearchFilter = ({search, func}) => {
  return (
    <input value={search} onChange={func} />
  )
}

export default App;
