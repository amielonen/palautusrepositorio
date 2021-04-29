import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesView, setCV] = useState([...countries])
  const [search, setSearch] = useState("")
  const [ccount, setccount] = useState(0)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, []);

  const handleSearch = (event) => {
    event.preventDefault()
    var cTemp = countries.filter((country) => 
    country.name.toLowerCase().includes(event.target.value))
    setccount(cTemp.length)
    setCV(cTemp)
    setSearch(event.target.value)
  }


  function handleClick(c) {
    setSearch(c.name.toLowerCase())
    var cTemp = countries.filter((country) => 
    country.name.toLowerCase().includes(c.name.toLowerCase()))
    setccount(cTemp.length)
    setCV(cTemp)
    setSearch(c.name.toLowerCase())
  }

  return (
    <div>
      <p>find countries</p>
      <SearchFilter search={search} func={handleSearch} />
      <Countries countries={countriesView} count={ccount} handleClick={handleClick}/>
    </div>
  )
} // App loppuu

const SearchFilter = ({search, func}) => {
  return (
    <input value={search} onChange={func} />
  )
}

const Countries = ({countries, count, handleClick}) => {
  if (count > 10) return (<p>Too many matches, specify another</p>)

  if (count === 1) {
    var ctr = countries[0]
    return (
    <div>
      <CountryInfo ctr={ctr} />
    </div>
    )}

    const countriesList = countries.map((country) => {
      return (
        <div key={country.alpha2Code}>
          {country.name} {" "}
          <button onClick={() => handleClick(country)} id={country.name}>show details</button>
        </div>
      )
    })

  return (
    <div>{countriesList}</div>
  )
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const Url = "http://api.weatherstack.com/current"
    const ACCESS_KEY = process.env.REACT_APP_API_KEY;
    const capital = country.capital

    axios
      .get(`${Url}?access_key=${ACCESS_KEY}&query=${capital}`)
      .then((response) => {
        setWeather(response.data)
      })
  }, [])

      return (
        <div>
            <p>
                <b>temperature:</b> {weather.current ? weather.current.temperature : "none"} Celcius
            </p>
            <img src={weather.current ? weather.current.weather_icons[0] : "none"} alt="img" width="100" height="100" />
            
            <p>
                <b>wind:</b> {weather.current ? weather.current.wind_speed : "none"} mph direction &nbsp;
                {weather.current ? weather.current.wind_dir : "none"}
            </p>
        </div>
      )

};


const CountryInfo = ({ctr}) => {
  var languages=ctr.languages
  return(
    <div>
      <h2>{ctr.name}</h2>
      <p>capital {ctr.capital}</p>
      <p>population {ctr.population}</p>
      <h1>languages</h1>
      <Languages languages={languages}/>
      <div>
      <img src={ctr.flag} width={"150px"} alt="Flag of the nation"></img>
      <Weather country={ctr}/>
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


export default App;
