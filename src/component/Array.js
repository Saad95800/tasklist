import React from 'react'
import Task from './Task'

export default function Array({data, deleteTask}){

    return (
        <div onDrop={(e)=>{
            console.log('dropped')
            console.log(e.target)
        }} style={{margin: '15px', backgroundColor: 'lightgrey', width: '200px', minHeight: '100px', border: '1px solid grey'}}>
            <p>{data.title}</p>
            {data.tasks.map((task, index)=>{
                return <Task key={index} task={task} deleteTask={deleteTask} />
            })}
        </div>
    )
}