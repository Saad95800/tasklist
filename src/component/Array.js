import React from 'react'
import Task from './Task'

// Le composant Array n'a pas d'états à modifier
export default function Array({data, deleteTask, moveTask, displayFormUpdateTask, displayFormArray}){
// étape 1 - Créer le HTML statique du composant Array
// étape 2 - Je créer un (ou des) composant(s) pour les élément dynamiques
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
            <p onClick={()=>{
                displayFormArray(data.id, data.title)
            }}>{data.title}</p>
            {data.tasks.map((task, index)=>{
                return <Task key={index} task={task} id_array={data.id} deleteTask={deleteTask} displayFormUpdateTask={displayFormUpdateTask} />
            })}
        </div>
    )
}