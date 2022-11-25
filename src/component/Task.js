
import React from 'react'

export default function Task({task, deleteTask, displayFormUpdateTask}){
// étape 1 - Créer le HTML statique du composant Task
// Composant n'a pas d'éléments dynamiques
    return (
        <div className="p-2 rounded bg-white d-flex flex-row-reverse justify-content-between" style={{cursor: 'pointer'}} draggable="true" 
        onDragStart={(e)=>{
            e.stopPropagation()
            e.dataTransfer.setData("id_task", task.id)
        }}
        onClick={(e)=>{
            e.stopPropagation()
            displayFormUpdateTask(task.id)
        }}>
            <button type="button" className="btn-close" aria-label="Close" onClick={(e)=>{
                e.stopPropagation()
                deleteTask(task.id)
            }}></button>
            <p>{task.intitule}</p>
        </div>
    )
}