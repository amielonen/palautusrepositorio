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
      <Part osa={props.p1.name} val={props.p1.exercises} />
      <Part osa={props.p2.name} val={props.p2.exercises} />
      <Part osa={props.p2.name} val={props.p2.exercises} />
    </div>
  )
};

const Part = props => {
  return (
    <div>
      <p>{props.osa} {props.val}</p>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header head={course} />
      <Content p1={part1} p2={part2} p3={part3} />
      <Total text="Sum of excercises" num={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App