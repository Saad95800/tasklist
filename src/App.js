
import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Container from './page/Container'
import {Routes, Route} from 'react-router-dom'
import HomePage from './page/HomePage';
import Login from './page/Login';
import SpaceList from './page/SpaceList'
import Message from './component/Message'
import { useSelector } from 'react-redux';

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const texte = useSelector((state) => state.message.texte)
  const viewMessage = useSelector((state) => state.message.viewMessage)
  const typeMessage = useSelector((state) => state.message.typeMessage)
  const connected = useSelector((state) => state.space.connected)

  const setData = (email, password) => {
    setEmail(email)
    setPassword(password)
  }

  const checkPassword = () => {
    console.log(sessionStorage.getItem('connected'))
    if(connected === '1'){
      return true
    }
    return false
  }

  return (
    <div className="App">
      {viewMessage && <Message texte={texte} typeMessage={typeMessage} />}
      <Routes>
        <Route path={`/login`} element={checkPassword() ? <HomePage /> : <Login setData={setData} data={{email: email, password: password}} />} />
        <Route path={`/`} element={checkPassword() ? <HomePage/> : <Login setData={setData} data={{email: email, password: password}} />} />
        <Route path={`/tasklist/:id`} element={ checkPassword() ? <Container /> : <Login setData={setData} data={{email: email, password: password}} />} />
        <Route path={`/spaces`} element={ checkPassword() ? <SpaceList /> : <Login setData={setData} data={{email: email, password: password}} />} />
      </Routes>
      
    </div>
  )
}

export default App;
