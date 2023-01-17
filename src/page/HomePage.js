import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { setConnected } from '../redux/space/SpaceSlice'
import { store } from '../redux/store'
export default function HomePage() {

  const navigate = useNavigate()

  const deconect = () => {
    sessionStorage.setItem('connected', '0')
    store.dispatch(setConnected('0'))
    return navigate('/login')
  }

  return (
    <div>
        <h1>Homepage</h1>
        {/* Le composant Link permet de rediriger vers une autre page sans avoir a actualiser la page (Single page Application) */}
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/spaces" className="btn btn-primary">Liste des espaces de travail</Link>
        <button className="btn btn-danger" onClick={()=>{deconect()}}>Se déconnecter</button>
    </div>
  )
}
