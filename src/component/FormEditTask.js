import React, {useState} from 'react'
import { setDisplayFormEditTask } from '../redux/array/ArraySlice'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styleModal } from '../utils/data'
import { updateTask } from '../redux/task/TaskSlice'

export default function FormEditTask({task,closeFromEditTask}) {

    const [titleTask, setTitletask] = useState(task.intitule)

  return (

        <Modal
            open={true}
            onClose={()=>{closeFromEditTask()}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Modifier une tâche
            </Typography>
            <div>

                    <form className="forms d-flex flex-column" onSubmit={(e)=>{
                        e.preventDefault() // Pour ne pas que la page s'actualise

                        if(titleTask.length === 0){
                            store.dispatch(displayMessage({texte:'Veuillez saisir un titre de tâche', typeMessage: 'error'}))
                            return
                        }
                        store.dispatch(updateTask({
                            id_task: task.id, 
                            intitule: titleTask
                        })) // On éxécute la fontion de modification de tâche
                        store.dispatch(displayMessage({texte:'Tâche modifié avec succès !', typeMessage: 'success'}))
                        store.dispatch(setDisplayFormEditTask(false))
                    }}
                    onClick={(e)=>{
                        e.stopPropagation()
                    }}>
                        <div className="form-group">
                            <label>Modifier une tâche</label>
                            <input type="text" className="form-control" value={titleTask} onChange={(e)=>{
                                setTitletask(e.target.value) 
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
