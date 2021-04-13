import React, { useState } from 'react'


const Stats = (props) => {
  if (props.kaikki === 0) return (<p>Ei annettua palautetta</p>)
  return (
    <table>
      <tr>
        <td>hyvä</td>
        <td>{props.hyva}</td>
      </tr>
      <tr>
        <td>neutraali</td>
        <td>{props.neutraali}</td>
      </tr>
      <tr>
        <td>huono</td>
        <td>{props.huono}</td>
      </tr>
      <tr>
        <td>kaikki</td>
        <td>{props.kaikki}</td>
      </tr>
      <tr>
        <td>keskiarvo</td>
        <td>{props.ka}</td>
      </tr>
      <tr>
        <td>positiivinen</td>
        <td>{props.hyva/props.kaikki}</td>
      </tr>
    </table>
  )
}


const Button = ({funktio, text}) => {
  return (
    <button onClick={funktio}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [ hyva, setHyva ] = useState(0)
  const kasvataHyva = () => setHyva(hyva + 1)

  const [ neutraali, setNeutraali ] = useState(0)
  const kasvataNeutraali = () => setNeutraali(neutraali + 1)

  const [ huono, setHuono ] = useState(0)
  const kasvataHuono = () => setHuono(huono + 1)

  const kaikki = hyva + neutraali + huono
  const ka = (hyva*1 + huono*-1)/kaikki


  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button funktio={kasvataHyva} text="Hyvä"></Button>
      <Button funktio={kasvataNeutraali} text="Neutraali"></Button>
      <Button funktio={kasvataHuono} text="Huono"></Button>
      <h1>
      Tilastot
      </h1>
      <Stats hyva={hyva} neutraali={neutraali}
      huono={huono} kaikki={kaikki} ka={ka} />
    </div>
  )

}

export default App;
