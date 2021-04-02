import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Content = props => {
  return (
    <div>
      <Part osa={props.osat[0]} />
      <Part osa={props.osat[1]} />
      <Part osa={props.osat[2]} />
    </div>
  )
};

const Part = props => {
  return (
    <div>
      <p>{props.osa.text} {props.osa.val}</p>
      </div>
  )
};

const Total = (props) => {
  return (
    <div>
      <p>
        {props.text} {props.num}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const total = 'Number of excercises' 


  const sisallot = {
    aiheet: [
      {
      text: "Fundamentals of React",
      val: 10
    },
    {
      text:'Using props to pass data',
      val: 7
    },
    {
      text: 'State of a component',
      val: 14
    }
   ]
  };

  return (
    <div>
      <Header text={course}/>
      <Content osat={sisallot.aiheet} />
      <Total text={total} num={exercises1 + exercises2 + exercises3} />
      </div>
  );
};

export default App