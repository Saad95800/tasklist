import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login({setData, data}) {

    const navigate = useNavigate()

    useEffect(()=>{
        // Ce code va s'éxécuter lorsque le composant Login apparait (Avant même que le composant ai fini de se charger)
        console.log("J'arrive dans la page Login")
        if(data.email === 'test@test.fr' && data.password === '0000'){ // Si l'utilisateur est connecté
            // On renvoie vers la page d'accueil
            return navigate('/')
        }
        return ()=>{
            // Ce code va s'éxécuter lorsque le commposant Login disparaît (Changement de page de Login vers une autre page)
            console.log('Je quitte la page login')
        }
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  return (
    <>
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
        <div>Login</div>     

        <div>
            <div>
                <form  onSubmit={(e) =>{
                    e.preventDefault()
                    console.log(setData)
                    if(email === 'test@test.fr' && password === '0000'){
                        setData(email, password)
                        return navigate('/')
                    }
                    alert('Données de connexion incorrectes')
                }} className='mt-3'>
                    <div className='mb-3'>
                        <label>Login</label>
                        <input type="texte" value={email} onChange={(e)=>{
                            setEmail(e.target.value)
                        }} />
                    </div>
                    <div>
                        <label>Mot de passe</label>
                        <input type="password"  value={password} onChange={(e)=>{
                            setPassword(e.target.value)
                        }}/>
                    </div>
                    <input className='btn btn-primary ' type="submit" value="Connexion" />
                </form>
            </div>
        </div>

    </>

  )
}
