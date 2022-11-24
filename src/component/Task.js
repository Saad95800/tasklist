
import React from 'react'

export default function Task({task, deleteTask}){

    return (
        <div className="bg-white d-flex flex-row-reverse" style={{cursor: 'pointer'}}>
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{
                deleteTask(task.id)
            }}></button>
            <p>{task.intitule}</p>
        </div>
    )
}