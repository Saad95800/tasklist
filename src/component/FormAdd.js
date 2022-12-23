import React, {useState} from 'react'
import { setDisplayFormAddArray } from '../redux/array/ArraySlice'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styleModal } from '../utils/data'
import { useSelector } from 'react-redux';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router';


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
                <form className="forms" onSubmit={(e)=>{ {/* étape 5 - Créer la fonction de validation de formulaire */}
                    e.preventDefault()
                    if(title.length > 0){
                        {/* Dans cette fonction pour récupérer =le titre saisi par l'utilisateur, j'utilise le state title */}
                        {/* étape 6 - éxécuter la fonction qui se trouvera dans le composant parent (container) qui permettra d'ajouter un tableau dans le state arrays */}
                        store.dispatch(addTable({
                            title: title,
                            spaceId: id
                        }))
                        store.dispatch(displayMessage({texte:'Tableau ajouté avec succès !', typeMessage: 'success'}))
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
                        {/* <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Space</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={spaceId}
                                label="Age"
                                onChange={(e)=>{
                                    console.log(e.target.value)
                                    setSpaceId(e.target.value)
                                }}
                                >
                                {spaces.map((space)=>{
                                    return <MenuItem value={space.id}>{space.title}</MenuItem>
                                })}
                                </Select>
                            </FormControl>
                        </Box> */}
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