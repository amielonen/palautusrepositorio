import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.head}</h1>
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
      <p>{props.osa.name} {props.osa.exercises}</p>
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header head={course.name} />
      <Content osat={course.parts} />
      <Total text="Sum of excercises" num={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

export default App