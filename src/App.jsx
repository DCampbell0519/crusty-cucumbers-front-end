import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm/SignUpForm.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <h1>Crusty Cucumbers</h1> */}
     <SignUpForm />
    </>
  )
}

export default App
