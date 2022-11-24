import React, {useState} from 'react'
import Array from './Array'
import FormAdd from './FormAdd'
import FormSup from './FormSup'
import { v4 as uuidv4 } from 'uuid';
import FormAddTask from './FormAddTask'
import {Link} from 'react-router-dom'

export default function Container(){

    const [arrays, setArrays] = useState([
        {
            id: 1,
            title: 'Projet ressource',
            tasks: [
                {
                    id: 1,
                    intitule: 'Faire la page d\'accueil'
                },
                {
                    id: 2,
                    intitule: 'Faire le header'
                },
                {
                    id: 3,
                    intitule: 'Faire le footer'
                }
            ]
        },
        {
            id: 2,
            title: 'Sujet de la prochaine réunion',
            tasks: [
                {
                    id: 4,
                    intitule: 'Faire le systeme de connexion'
                },
                {
                    id: 5,
                    intitule: 'Créer la base de donnée'
                }
            ]
        },
        {
            id: 3,
            title: 'A faire',
            tasks: [
                {
                    id: 16,
                    intitule: 'Faire la pagination de la page d\'accueil'
                }
            ]
        },
        {
            id: 4,
            title: 'En cours',
            tasks: []
        }
    ])

    const addTable = (title) => {
        let newArrays = [...arrays]
        newArrays.push({
            id: arrays.length + 1,
            title: title
        })
        setArrays(newArrays)
    }   

    const deleteTable = (id) => {
        let newArrays = []
        
        for(let arr of arrays){
            if(arr.id !== Number(id)){
                newArrays.push(arr)
            }
        }
        setArrays(newArrays)
    }

    const addTask = (task, idArray) => {

        let newArray = []

        for(let array of arrays){

            if(Number(array.id) === Number(idArray)){
                newArray.push({
                    ...array,
                    tasks: [
                        ...array.tasks,
                        {
                            id: uuidv4(),
                            intitule: task
                        }
                    ]
                })
            }else{
                newArray.push(array)
            }

        }

        setArrays(newArray)

    }

    const deleteTask = (id_task) => {
        
        let newArray = [...arrays]

        for(let array of newArray){
            let newTasks = []
            for(let task of array.tasks){
                if(task.id.toString() !== id_task.toString()){
                    newTasks.push(task)
                }
            }
            array.tasks = newTasks
        }

        setArrays(newArray)
    }

    return (
        <div className="container">
            <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <div className="d-flex">
                <FormAdd addTable={addTable} />
                <FormSup arrays={arrays} deleteTable={deleteTable} />
                <FormAddTask arrays={arrays} addTask={addTask} />
            </div>
            <div className="d-flex">
                {arrays.map((array, index)=>{
                    return <Array key={index} data={array} deleteTask={deleteTask} />
                })}
            </div>
        </div>
    )

}