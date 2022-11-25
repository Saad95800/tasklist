import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'

// Quand on a un formulaire en react, on dot créer des states pour chaque champs modifiable
export default function Login({setData, data}) {

    const navigate = useNavigate()

    // Si on veut éxécuter une code au début du chargement d'un composant, on le met dans le useEffect
    useEffect(()=>{
        // Ce code va s'éxécuter lorsque le composant Login apparait (Avant même que le composant ai fini de se charger)
        console.log("J'arrive dans la page Login")
        if(data.email === 'test@test.fr' && data.password === '0000'){ // On vérifie si l'utilisateur est connecté
            // Si oui on renvoie vers la page d'accueil
            return navigate('/')
        }
        // si l'user n'est pas connecté, on laisse lo composant se charger
        return ()=>{
            // Ce code va s'éxécuter lorsque le commposant Login disparaît (Changement de page de Login vers une autre page)
            console.log('Je quitte la page login')
        }
    })

    // étape 1 - Créer les states qui contiendrons les valeurs du formulaire
    const [email, setEmail] = useState('') // Un state pour stocker l'email saisi par l'utilisateur
    const [password, setPassword] = useState('') // Un state pour stocker le mot de passe saisi par l'utilisateur

    // étape 2 - Créer le HTML du formulaire
  return (
    <>
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
        <div>Login</div>     

        <div>
            <div>
                <form  onSubmit={(e) =>{ {/* étape 5 - Créer la fonction de validation de formulaire */}
                    e.preventDefault()
                    {/* Dans cette fonction pour récupérer les valeurs saisies par l'utilisateur on utilise les states */}
                    
                    if(email === 'test@test.fr' && password === '0000'){
                        setData(email, password)
                        return navigate('/')
                    }
                    alert('Données de connexion incorrectes')
                }} className='mt-3'>
                    <div className='mb-3'>
                        <label>Login</label>
                        {/* étape 3 - Associer les states aux champs de formulaire */}
                        <input type="text" value={email} onChange={(e)=>{ // On donne au champs text la valeur du state email
                            {/* étape 4 - Créer le code qui modifie les states en fonctions des valeurs saisies par l'utilisateur */}
                            setEmail(e.target.value) // On modifie le state email en récupérant ce que l'utilisateur a saisi
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
