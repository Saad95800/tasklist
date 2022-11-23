import React, {useState} from 'react'

export default function FormAddTask({arrays, addTask}){

    const [task, setTask] = useState('')
    const [idArray, setIdArray] = useState(1)

    return (
        <div>
            <form action="" onSubmit={(e)=>{
                e.preventDefault()
                addTask(task, idArray)
            }}>
            <div>
                    <label>task</label>
                    <select value={idArray} onChange={(e) => {
                            setIdArray(e.target.value)
                    }}>
                        {arrays.map((array, index) => {
                            return <option key={index} value={array.id}>{array.title}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label>Tâche</label>
                    <input value={task} onChange={(e) => {
                        setTask(e.target.value)
                    }} type="text" />
                </div>
                <input type="submit" value="Ajouter une tâche" /> 
            </form>
        </div>
    )

}