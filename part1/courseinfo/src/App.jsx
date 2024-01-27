import { useState } from 'react'

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Footer parts={course} />
    </div>
  )
}

export default App
