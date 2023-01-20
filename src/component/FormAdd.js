import React, {useState} from 'react'
import { setDisplayFormAddArray } from '../redux/array/ArraySlice'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styleModal } from '../utils/data'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import firebase from 'firebase'

export default function FormAdd({addTable, closeFormAddArray}){
// étape 1 - Créer le HTML statique du composant FormAdd
// Composant n'a pas d'éléments dynamiques

    const [title, setTile] = useState('') // étape 2 - On crée un state par champs de formulaire
    const [spaceId, setSpaceId] = useState(null) 
    const spaces = useSelector(state => state.space.spaces)

    const {id} = useParams()

    return(
        <Modal
            open={true}
            onClose={()=>{closeFormAddArray()}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Ajouter un tableau
            </Typography>

            <div>
                <form className="forms" onSubmit={async (e)=>{ {/* étape 5 - Créer la fonction de validation de formulaire */}
                    e.preventDefault()
                    if(title.length > 0){
                        {/* Dans cette fonction pour récupérer =le titre saisi par l'utilisateur, j'utilise le state title */}
                        {/* étape 6 - éxécuter la fonction qui se trouvera dans le composant parent (container) qui permettra d'ajouter un tableau dans le state arrays */}
                        
                        let newArray = {
                            title: title,
                            spaceId: id,
                            order: 1
                        }

                        let message = ''
                        let typeMessage = 'success'

                        let arrayRef = firebase.firestore().collection("array")

                        await arrayRef.add(newArray)
                        .then((docRef)=>{
                            newArray.id = docRef.id
                                store.dispatch(addTable(newArray))
                                message = "Tableau crée avec success !"
                                typeMessage = 'success'
                        })
                        .catch(()=>{
                            message = "Echec lors de l'ajout du tableau"
                            typeMessage = 'error'
                        })
                        
                        store.dispatch(displayMessage({texte: message, typeMessage: typeMessage}))
                        store.dispatch(setDisplayFormAddArray(false))
                    }else{
                        store.dispatch(displayMessage({texte: 'Veuillez saisir un titre de tableau', typeMessage:'error'}))
                    }
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
            </div>
            </Box>
        </Modal>
             
        
    )
}