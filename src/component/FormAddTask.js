import React, {useState} from 'react'
import { addTask } from '../redux/array/ArraySlice'
import { store } from '../redux/store'

export default function FormAddTask({arrays, closeFormAddTask}){

    const [task, setTask] = useState('')
    const [idArray, setIdArray] = useState(1)

    return (
        <div className="container-form">
            <form className="forms" action="" onSubmit={(e)=>{
                e.preventDefault()
                store.dispatch(addTask({
                    title: task, 
                    id_array: idArray
                }))
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
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{
                closeFormAddTask()
            }}></button>
        </div>
    )

}