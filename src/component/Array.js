import React from 'react'
import Task from './Task'

export default function Array({data, deleteTask, moveTask, displayFormUpdateTask}){

    return (
        <div className="p-2 m-3 rounded" style={{minWidth: '250px', backgroundColor: '#f3f3f3', minHeight: '100px', border: '#f3f3f3'}}
        onDrop={(e)=>{
            console.log('drop')
            let id_task = e.dataTransfer.getData('id_task') // Id de la tache a déplacer
            let id_array = data.id // id du nouveau tableau
            moveTask(id_task, id_array)
        }}
        onDragOver={(e)=>{
            e.preventDefault()
        }}
        >
            <p>{data.title}</p>
            {data.tasks.map((task, index)=>{
                return <Task key={index} task={task} id_array={data.id} deleteTask={deleteTask} displayFormUpdateTask={displayFormUpdateTask} />
            })}
        </div>
    )
}