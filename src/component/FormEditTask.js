import React, {useState} from 'react'
import { setDisplayFormEditTask, updateTask } from '../redux/array/ArraySlice'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'

export default function FormEditTask({task,closeFromEditTask}) {

    const [titleTask, setTitletask] = useState(task.intitule)

  return (
    <div className="container-form" onClick={()=>{
        closeFromEditTask()
    }}>
        <form className="forms d-flex flex-column" onSubmit={(e)=>{
            e.preventDefault() // Pour ne pas que la page s'actualise


            if(titleTask.length === 0){
                store.dispatch(displayMessage({texte:'Veuillez saisir un titre de tâche', typeMessage: 'error'}))
                store.dispatch(setDisplayFormEditTask(false))
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
  )
}
