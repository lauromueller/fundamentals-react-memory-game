import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let counter = 0;

type CounterProps = {
  value: number;
  onClick: () => void;
};

const Counter = ({ value, onClick }: CounterProps) => {
  return (
    <>
      <div>My value is: {value}</div>
      <button onClick={onClick}>Increment</button>
    </>
  );
};

const incrementCounter = () => {
  counter++;
  console.log(counter);
  root.render(
    <React.StrictMode>
      <Counter
        value={counter}
        onClick={incrementCounter}
      />
    </React.StrictMode>
  );
};

root.render(
  <React.StrictMode>
    <Counter
      value={counter}
      onClick={incrementCounter}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
