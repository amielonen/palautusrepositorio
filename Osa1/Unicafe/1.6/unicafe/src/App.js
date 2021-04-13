import React, { useState } from 'react'

const Statistics = (props) => {
  if (props.kaikki == 0) return (
    <div>
    <p>Ei annettua palautetta</p>
    </div>
  )
  return (
      <div>
        <StatisticsLine text="hyvä" value={props.hyva}/>
        <StatisticsLine text="neutraali" value={props.neutraali}/>
        <StatisticsLine text="huono" value={props.huono}/>
        <StatisticsLine text="kaikki" value={props.kaikki}/>
        <StatisticsLine text="keskiarvo" value={props.ka}/>
        <StatisticsLine text="positiivinen" value={props.hyva/props.kaikki}/>
      </div>
  )
}


const StatisticsLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
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
      <Statistics hyva={hyva} neutraali={neutraali}
      huono={huono} kaikki={kaikki} ka={ka} />

    </div>
  )

}

export default App;
