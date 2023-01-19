import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { setTitle, updateSpace, setViewFormEditSpace, addSpace, setColor } from '../../redux/space/SpaceSlice'
import { store } from '../../redux/store'
import CloseIcon from '@mui/icons-material/Close'
import { displayMessage } from '../../redux/message/MessageSlice'
import firebase from 'firebase'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styleModal } from '../../utils/data'
import { v4 as uuidv4 } from 'uuid';

export default function FormEditSpace() {

    const title = useSelector(state => state.space.title)
    const spaceToEdit = useSelector(state => state.space.spaceToEdit)
    const contextSpace = useSelector(state => state.space.contextSpace)
    const color = useSelector(state => state.space.color)

    useEffect(() => {
        if(contextSpace === 'edit') store.dispatch(setTitle(spaceToEdit.title))
        return ()=>{
            // Ce code s'éxécute lorsque le composant disparait
            store.dispatch(setTitle(''))
            store.dispatch(setColor('#ffffff'))
        }
    }, [spaceToEdit])

  return (

    <>
        <div>
      <Modal
        open={true}
        onClose={()=>{store.dispatch(setViewFormEditSpace(false))}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
            <CloseIcon onClick={()=>{
                store.dispatch(setViewFormEditSpace(false))
            }} style={{position: 'absolute', top: '10px', right: '10px', width: '35px', height: '35px'}}/>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {contextSpace === 'edit' ? 'Modifier un espace' : 'Ajouter un espace'}
          </Typography>
          
          <div>
            <form className="forms" onSubmit={async (e)=>{
                    e.preventDefault()

                    if(title.length === 0){
                        store.dispatch(displayMessage({
                            texte: 'Veuillez saisir un titre',
                            typeMessage: 'error'
                        }))
                        return
                    }
                    let message = ''
                    let typeMessage = 'success'
                    // Code de modification du space
                    if(contextSpace === 'edit'){
                        store.dispatch(updateSpace({
                            title_space: title,
                            id_space: spaceToEdit.id,
                            color: color
                        }))   
                        message = "Espace modifié avec succès !"    
                    }else{
                        let newSpace = {
                            id: uuidv4(),
                            title: title,
                            color: color
                        }

                        let spaceRef = firebase.firestore().collection('space')
                        await spaceRef.add(newSpace)
                        .then(()=>{
                            store.dispatch(addSpace(newSpace))    
                            message = "Espace ajouté avec succès !" 
                        })
                        .catch(()=>{
                            message = "Echec de l'ajout de l'espace !" 
                            typeMessage = 'error'
                        })
                        
                    }
                    store.dispatch(displayMessage({
                            texte: message,
                            typeMessage: typeMessage
                        }))  

                }}>
                    <div className="form-group">
                        <input className="form-control" type="text" value={title} onChange={(e)=>{
                            store.dispatch(setTitle(e.target.value))
                        }}/>
                    </div>
                    <label htmlFor="color" className="form-label">Couleur</label>
                    <input type="color" className="form-control form-control-color" id="color" value={color} title="Choississez la couleur"
                        onChange={(e)=>{
                            store.dispatch(setColor(e.target.value))
                        }} />
                    <div className="form-group">
                        <button className="btn btn-success" type="submit">
                            {contextSpace === 'edit' ? 'Enregistrer' : 'Ajouter'}
                        </button>
                    </div>
                </form>
          </div>
        </Box>
      </Modal>
    </div>

    </>

    
  )
}
