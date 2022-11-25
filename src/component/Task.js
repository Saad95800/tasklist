
import React from 'react'

export default function Task({task, deleteTask, displayFormUpdateTask}){

    return (
        <div className="p-2 rounded bg-white d-flex flex-row-reverse justify-content-between" style={{cursor: 'pointer'}} draggable="true" onDragStart={(e)=>{
            console.log('drag')
            e.dataTransfer.setData("id_task", task.id)
        }}
        onClick={()=>{
            displayFormUpdateTask(task.id)
        }}>
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{
                deleteTask(task.id)
            }}></button>
            <p>{task.intitule}</p>
        </div>
    )
}