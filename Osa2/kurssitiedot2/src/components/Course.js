import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h1>{props.head}</h1>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
          {parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
    )
  };
  
  const Part = ({part}) => {
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
        </div>
    )
  };
  
  const Total = ({text, course}) => {
    var parts = course.parts
  
    return (
      <div>
        <p>
          {text} {parts.reduce((sum, part) => sum + part.exercises, 0)}
        </p>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header head={course.name} />
        <Content parts={course.parts} />
        <Total text="Sum of excercises" course={course} />
        </div>
      )
    }

    export default Course