
import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Container from './component/Container'
import {Routes, Route} from 'react-router-dom'
import HomePage from './component/HomePage';
import Login from './component/Login';

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setData = (email, password) => {
    setEmail(email)
    setPassword(password)
  }

  const checkPassword = () => {
    if(email ==='test@test.fr' && password === '0000'){
      return true
    }
    return false
  }

  return (
    <div className="App">
      <Routes>
        <Route path={`/login`} element={<Login setData={setData} data={{email: email, password: password}} />} />
        <Route path={`/`} element={checkPassword() ? <HomePage/> : <Login setData={setData} data={{email: email, password: password}} />} />
        <Route path={`/tasklist`} element={ checkPassword() ? <Container /> : <Login setData={setData} data={{email: email, password: password}} />} />
      </Routes>
      
    </div>
  )
}

export default App;
