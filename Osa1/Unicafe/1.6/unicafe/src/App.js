import React, { useState } from 'react'

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
      <button onClick={kasvataHyva}>
      hyvä
      </button>
      <button onClick={kasvataNeutraali}>
      neutraali
      </button>
      <button onClick={kasvataHuono}>
      huono
      </button>
      <h1>
        Tilastot
      </h1>
      <p>hyvä {hyva}</p>
      <p>neutraali {neutraali}</p>
      <p>huono {huono}</p>
      <p>kaikki {kaikki}</p>
      <p>keskiarvo {ka}</p>
      <p>positiivinen { hyva/kaikki }</p>
    </div>
  )

}

export default App;
