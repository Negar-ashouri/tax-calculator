import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaxCalculatorForm from "./components/TaxCalculatorForm";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Income Tax Calculator</h1>
      {/* <TaxCalculatorForm /> */}
    </div>
  );
}

export default App
