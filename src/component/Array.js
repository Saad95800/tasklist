import React from 'react'
import { moveArray, moveTask } from '../redux/array/ArraySlice'
import { store } from '../redux/store'
import Task from './Task'

// Le composant Array n'a pas d'états à modifier
export default function Array({data, displayFormUpdateTask, displayFormArray}){

    return (
        <div className="p-2 m-3 rounded" style={{minWidth: '250px', backgroundColor: '#f3f3f3', minHeight: '100px', border: '#f3f3f3'}}
        draggable="true"
        onDragStart={(e)=>{
            e.stopPropagation()
            e.dataTransfer.setData("id_array_drag", data.id)
            e.dataTransfer.setData("order_array_drag", data.order)
        }}
        onDrop={(e)=>{
            e.stopPropagation()
            console.log('drop')
            let id_task = e.dataTransfer.getData('id_task') // Id de la tache a déplacer
            let id_array_drop = data.id // id du nouveau tableau
            console.log(e.dataTransfer.getData('id_task'))
            console.log(e.dataTransfer.getData('id_array_drag'))
            if(e.dataTransfer.getData('id_task') !== undefined && e.dataTransfer.getData('id_task') !== null && e.dataTransfer.getData('id_task') !== ''){
                store.dispatch(moveTask({
                    id_task, 
                    id_array_drop}))
            }
            if(e.dataTransfer.getData('id_array_drag') !== undefined && e.dataTransfer.getData('id_array_drag') !== null && e.dataTransfer.getData('id_array_drag') !== ''){
                let id_array_drag = e.dataTransfer.getData('id_array_drag')
                let order_array_drag = e.dataTransfer.getData('order_array_drag')
                console.log('here')
                store.dispatch(moveArray({
                    id_array_drag: id_array_drag, 
                    order_array_drag: order_array_drag, 
                    id_array_drop: id_array_drop, 
                    order: data.order
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
            {data.tasks.map((task, index)=>{
                return <Task key={index} task={task} id_array={data.id} displayFormUpdateTask={displayFormUpdateTask} />
            })}
        </div>
    )
}