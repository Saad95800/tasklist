import React, {useState} from 'react'
import { updateTask } from '../redux/array/ArraySlice'
import { store } from '../redux/store'

export default function FormEditTask({task,closeFromEditTask}) {

    const [titleTask, setTitletask] = useState(task.intitule)

  return (
    <div className="container-form" onClick={()=>{
        closeFromEditTask()
    }}>
        <form className="forms d-flex flex-column" onSubmit={(e)=>{
            e.preventDefault() // Pour ne pas que la page s'actualise
            store.dispatch(updateTask({
                id_task: task.id, 
                intitule: titleTask
            })) // On éxécute la fontion de modification de tâche
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
