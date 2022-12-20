import React, {useState} from 'react'
import { setDisplayFormAddArray } from '../redux/array/ArraySlice'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'

export default function FormAdd({addTable, closeFormAddArray}){
// étape 1 - Créer le HTML statique du composant FormAdd
// Composant n'a pas d'éléments dynamiques

    const [title, setTile] = useState('') // étape 2 - On crée un state par champs de formulaire

    return(
        <div className="container-form">
            <form className="forms" onSubmit={(e)=>{ {/* étape 5 - Créer la fonction de validation de formulaire */}
                e.preventDefault()
                if(title.length > 0){
                    {/* Dans cette fonction pour récupérer =le titre saisi par l'utilisateur, j'utilise le state title */}
                    {/* étape 6 - éxécuter la fonction qui se trouvera dans le composant parent (container) qui permettra d'ajouter un tableau dans le state arrays */}
                    addTable(title)
                    store.dispatch(displayMessage({texte:'Tableau ajouté avec succès !', typeMessage: 'success'}))
                }else{
                    store.dispatch(displayMessage({texte: 'Veuillez saisir un titre de tableau', typeMessage:'error'}))
                }
                store.dispatch(setDisplayFormAddArray(false))
            }}>
                <div className="form-group">
                    <label>Ajouter un tableau</label>
                    {/* étape 3 - On associe le state au champs text du formulaire */}
                    <input type="text" value={title} onChange={(e)=>{
                        {/* étape 4 - Créer le code qui modifie le state en fonction de la valeur saisie par l'utilisateur */}
                        setTile(e.target.value) 
                    }} />
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Ajouter"/>
                </div>
            </div>
            </form>     
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{
                closeFormAddArray()
            }}></button>   
        </div>
    )
}