import React, {useState} from 'react'
import { deleteTable } from '../redux/array/ArraySlice'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styleModal } from '../utils/data'
import firebase from 'firebase'

export default function FormSup({arrays, closeFormDeleteArray}){
// étape 1 - Créer le HTML statique du composant FormAdd
// Composant n'a pas d'éléments dynamiques


    const [idArray, setIdArray] = useState(1) // étape 2 - On crée un state par champs de formulaire

    return (
        <Modal
            open={true}
            onClose={()=>{closeFormDeleteArray()}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Supprimer un tableau
        </Typography>

        <div>
            <form className="forms" onSubmit={async (e)=>{ {/* étape 5 - Créer la fonction de validation de formulaire */}
                    e.preventDefault()

                    let message = ''
                    let typeMessage = 'success'
                    let arrayRef = firebase.firestore().collection("array")
                    let docRef = arrayRef.doc(idArray)

                    await docRef.delete().then(()=>{
                        console.log('then')
                        message = "Tableau supprimé avec succès"
                        typeMessage = "success"
                        store.dispatch(deleteTable(idArray))
                    }).catch((error)=>{
                        console.log('catch')
                        console.log(error)
                        message = "Echec de la suppression du tableau"
                        typeMessage = "error"
                    })

                    {/* Dans cette fonction pour récupérer le titre l'id du tableau saisi par l'utilisateur, j'utilise le state idArray */}
                    {/* étape 6 - éxécuter la fonction qui se trouvera dans le composant parent (container) qui permettra de supprimer un tableau dans le state arrays */}
                    
                    store.dispatch(displayMessage({texte: message, typeMessage: typeMessage}))
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
                
                </form>
        </div>
        </Box>
    </Modal>
            
    )
}