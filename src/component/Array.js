import React from 'react'
import { moveArray } from '../redux/array/ArraySlice'
import { moveTask, deleteTask } from '../redux/task/TaskSlice'
import { store } from '../redux/store'
import Task from './Task'
import PopinConfirmAction from '../component/PopinConfirmAction'
import { useSelector } from 'react-redux'
import { displayMessage } from '../redux/message/MessageSlice'

// Le composant Array n'a pas d'états à modifier
export default function Array({data, displayFormUpdateTask, displayFormArray}){

    const viewModalConfirm = useSelector(state => state.message.viewModalConfirm)
    const idTaskConfirmDelete = useSelector(state => state.array.idTaskConfirmDelete)
    const tasks = useSelector(state => state.task.tasks)
    
    const deleteTaskAction = (taskId) => {
        store.dispatch(deleteTask(taskId))
        store.dispatch(displayMessage({
            texte: "Tâche supprimée avec succès",
            typeMessage: 'success'
        }))
    }

    let taskElements = []

    for(let task of tasks){
        if(task.arrayId.toString() === data.id.toString()){
            taskElements.push(<Task key={task.id} task={task} id_array={data.id} displayFormUpdateTask={displayFormUpdateTask} />)   
        }
    }

    return (
        <>
            { viewModalConfirm && <PopinConfirmAction 
                                message={"êtes-vous sûr de vouloir supprimer cette tâche ?"}
                                action={deleteTaskAction}
                                params={[idTaskConfirmDelete]} />}

<div className="p-2 m-3 rounded" style={{minWidth: '250px', backgroundColor: '#f3f3f3', minHeight: '100px', border: '#f3f3f3'}}
        draggable="true"
        onDragStart={(e)=>{
            e.stopPropagation()
            e.dataTransfer.setData("id_array_drag", data.id)
            e.dataTransfer.setData("order_array_drag", data.order)
        }}
        onDrop={(e)=>{
            e.stopPropagation()
            let id_task = e.dataTransfer.getData('id_task') // Id de la tache a déplacer
            let id_array_drop = data.id // id du nouveau tableau
            if(e.dataTransfer.getData('id_task') !== undefined && e.dataTransfer.getData('id_task') !== null && e.dataTransfer.getData('id_task') !== ''){
                store.dispatch(moveTask({
                    id_task, 
                    id_array_drop}))
            }
            if(e.dataTransfer.getData('id_array_drag') !== undefined && e.dataTransfer.getData('id_array_drag') !== null && e.dataTransfer.getData('id_array_drag') !== ''){
                let id_array_drag = e.dataTransfer.getData('id_array_drag')
                let order_array_drag = e.dataTransfer.getData('order_array_drag')

                store.dispatch(moveArray({
                    id_array_drag: id_array_drag, 
                    order_array_drag: order_array_drag, 
                    id_array_drop: id_array_drop, 
                    order_array_drop: data.order
                }))
            }
        }}
        onDragOver={(e)=>{
            e.preventDefault()
        }}
        >
            <p onClick={()=>{
                displayFormArray(data.id, data.title)
            }}>{data.title}</p>
            {taskElements}
        </div>

        </>
        
    )
}