import React, {useState} from 'react'
import { updateArray, setDisplayFormEditArray } from '../redux/array/ArraySlice'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styleModal } from '../utils/data'
import firebase from 'firebase'

export default function FormEditArray({array, closeFromEditArray}) {

    const [titleArray, setTitleArray] = useState(array.title)

  return (

    <Modal
            open={true}
            onClose={()=>{closeFromEditArray()}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Modifier un tableau
            </Typography>
            <div>
                <form className="forms d-flex flex-column" onSubmit={async (e)=>{
                        e.preventDefault()
                        if(titleArray.length === 0){
                            store.dispatch(displayMessage({texte:'Veuillez saisir un titre de tableau', typeMessage: 'error'}))
                            return
                        }
                        console.log(array)
                        let newArray = {
                            id: array.id.toString(),
                            title: titleArray,
                            order: array.order,
                            spaceId: array.spaceId
                        }
                        console.log(newArray)
                        let message = ''
                        let typeMessage = 'success'

                        let arrayRef = firebase.firestore().collection('array')
                        let arrayDoc = arrayRef.doc(array.id.toString());
                        await arrayDoc.update(newArray)
                        .then((docRef)=>{
                            newArray.id = array.id.toString()
                            store.dispatch(updateArray(newArray))    
                            message = "Tableau mis à jour avec succès !" 
                            typeMessage = "success"
                        })
                        .catch((error)=>{
                            console.log('catch')
                            console.log(error)
                            message = "Echec de la mise à jour de du tableau !" 
                            typeMessage = 'error'
                        })

                        store.dispatch(displayMessage({texte: message, typeMessage: typeMessage}))
                        store.dispatch(setDisplayFormEditArray(false))
                    }}
                    onClick={(e)=>{
                        e.stopPropagation()
                    }}>
                        <div className="form-group">
                            <label>Modifier une un tableau</label>
                            <input type="text" className="form-control" value={titleArray} onChange={(e)=>{
                                setTitleArray(e.target.value) 
                            }} />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Modifier"/>
                        </div>
                </form>
            </div>
            </Box>
        </Modal>
        
        
  )
}
