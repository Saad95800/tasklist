import React from 'react'
import Task from './Task'

export default function Array({data, deleteTask, moveTask}){

    return (
        <div style={{margin: '15px', backgroundColor: 'lightgrey', width: '200px', minHeight: '100px', border: '1px solid grey'}}
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
                return <Task key={index} task={task} id_array={data.id} deleteTask={deleteTask} />
            })}
        </div>
    )
}