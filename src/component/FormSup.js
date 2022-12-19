import React, {useState} from 'react'

export default function FormSup({arrays, deleteTable, closeFormDeleteArray}){
// étape 1 - Créer le HTML statique du composant FormAdd
// Composant n'a pas d'éléments dynamiques


    const [idArray, setIdArray] = useState(1) // étape 2 - On crée un state par champs de formulaire

    return (
        <div className="container-form">
            <form className="forms" onSubmit={(e)=>{{/* étape 5 - Créer la fonction de validation de formulaire */}
                e.preventDefault()
                {/* Dans cette fonction pour récupérer le titre l'id du tableau saisi par l'utilisateur, j'utilise le state idArray */}
                {/* étape 6 - éxécuter la fonction qui se trouvera dans le composant parent (container) qui permettra de supprimer un tableau dans le state arrays */}
                deleteTable(idArray)
            }}>
                <div className="form-group">
                    <label>Supprimer un tableau</label>
                    {/* étape 3 - On associe le state au champs text du formulaire (value) */}
                    <select value={idArray} onChange={(e)=>{
                        {/* étape 4 - Créer le code qui modifie le state en fonction de la valeur saisie par l'utilisateur */}
                        setIdArray(e.target.value)
                    }}>
                        {arrays.map((array, index)=>{
                            return <option key={index} value={array.id}>{array.title}</option>
                        })}
                    </select>
                <div className="form-group">
                    <input type="submit" className="btn btn-danger" value="Supprimer"/>
                </div>
            </div>
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{
                    closeFormDeleteArray()
                }}></button>  
            
            </form>
        </div>
    )
}