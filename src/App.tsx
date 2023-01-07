import React from 'react';
import logo from './logo.svg';
import './App.css';

type Theme = 'light' | 'dark';

const Greeting = () => {
  const name = 'Lauro';

  return <p>Hello, {name}</p>;
};

function App() {
  const theme: Theme = 'light';
  return (
    <div className={(theme as Theme) === 'dark' ? 'bg-dark' : 'bg-light'}>
      <Greeting />
      <Greeting />
    </div>
  );
}

export default App;
