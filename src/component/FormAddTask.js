import React, {useState} from 'react'
import { addTask, setDisplayFormAddTask } from '../redux/array/ArraySlice'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styleModal } from '../utils/data'

export default function FormAddTask({arrays, closeFormAddTask}){

    const [task, setTask] = useState('')
    const [idArray, setIdArray] = useState(1)

    return (
        <Modal
            open={true}
            onClose={()=>{closeFormAddTask()}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Supprimer un tableau
        </Typography>

        <div>

            <form className="forms" action="" onSubmit={(e)=>{
                    e.preventDefault()
                    if(task === ''){
                        store.dispatch(displayMessage({texte:'Veuillez saisir une tâche', typeMessage: 'error'}))
                        return
                    }
                    store.dispatch(addTask({
                        title: task, 
                        id_array: idArray
                    }))
                    store.dispatch(displayMessage({texte:'Tâche ajoutée avec succès', typeMessage: 'success'}))
                    store.dispatch(setDisplayFormAddTask(false))
                }}>
                    <div className="form-group">
                        <label>task</label>
                        <select className="form-control" value={idArray} onChange={(e) => {
                                setIdArray(e.target.value)
                        }}> 
                            {arrays.map((array, index) => {
                                return <option key={index} value={array.id}>{array.title}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Tâche</label>
                        <input className="form-control" value={task} onChange={(e) => {
                            setTask(e.target.value)
                        }} type="text" />
                    </div>
                    <input type="submit" className="btn btn-primary mt-2" value="Ajouter une tâche" /> 
                </form>

            </div>
                    </Box>
                </Modal>
            
    )

}