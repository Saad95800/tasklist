import React, {useState} from 'react'
import Array from './Array'
import FormAdd from './FormAdd'
import FormSup from './FormSup'
import { v4 as uuidv4 } from 'uuid';
import FormAddTask from './FormAddTask'
import {Link} from 'react-router-dom'
import FormEditTask from './FormEditTask';

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
            tasks: [
                {
                    id: 17,
                    intitule: 'ssssssssssssssss'
                }
            ]
        }
    ])

    const [displayFormAddArray, setDisplayFormAddArray] = useState(false)
    const [displayFormDeleteArray, setDisplayFormDeleteArray] = useState(false)
    const [displayFormAddTask, setDisplayFormAddTask] = useState(false)
    const [displayFormEditTask, setDisplayFormEditTask] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)

    const updateTask = (id_task, intitule) => {
        // On modifie dans le state la tâche
        let newArrays = [...arrays]

        for(let array of newArrays){
            for(let task of array.tasks){
                if(task.id.toString() === id_task.toString()){
                    task.intitule = intitule
                }
            }
        }

        setArrays(newArrays)
        setDisplayFormEditTask(false)

    }

    const displayFormUpdateTask = (id_task) =>{
        setDisplayFormEditTask(true) // On affiche le formulaire de modification de tâche
        // On récupère la tâche par son id et on la transmet au formulaire de modifiction de tâche
        setTaskToEdit(getTaskById(id_task))
    }

    const addTable = (title) => {
        let newArrays = [...arrays]
        newArrays.push({
            id: arrays.length + 1,
            title: title,
            tasks: []
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

    const closeFormAddArray = () =>{
        setDisplayFormAddArray(false)
    }
    const closeFormDeleteArray = () =>{
        setDisplayFormDeleteArray(false)
    }
    const closeFormAddTask = () =>{
        setDisplayFormAddTask(false)
    }

    const getTaskById = (id_task) => {
        let taskToMove = {}

        for(let array of arrays){
            for(let task of array.tasks){
                if(task.id.toString() === id_task.toString()){
                    taskToMove = task
                }
            }
        }

        return taskToMove

    }
    
    const moveTask = (id_task, id_array) => {
        let taskToMove = getTaskById(id_task)
        deleteTask(id_task)
        addTask(taskToMove.intitule, id_array)
    }

    return (
        <div className="container">
            <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <div className="d-flex">

            <div className='btn btn-info m-1' onClick={()=>{
                setDisplayFormAddArray(true)
            }} >Ajouter un tableau</div>

            <div className='btn btn-info m-1' onClick={()=>{
                setDisplayFormDeleteArray(true)
            }} >Supprimer un tableau</div>

            <div className='btn btn-info m-1' onClick={()=>{
                setDisplayFormAddTask(true)
            }} >Ajouter une tâche</div>
            
                {displayFormAddArray && <FormAdd addTable={addTable} closeFormAddArray={closeFormAddArray} />}
                {displayFormDeleteArray && <FormSup arrays={arrays} deleteTable={deleteTable} closeFormDeleteArray={closeFormDeleteArray} />}
                {displayFormAddTask && <FormAddTask arrays={arrays} addTask={addTask} closeFormAddTask={closeFormAddTask}/>}
                {displayFormEditTask && <FormEditTask task={taskToEdit} updateTask={updateTask} />}
            </div>
            <div className="d-flex" style={{overflowX: 'scroll'}}>
                {arrays.map((array, index)=>{
                    return <Array key={index} data={array} deleteTask={deleteTask} moveTask={moveTask} displayFormUpdateTask={displayFormUpdateTask} />
                })}
            </div>
        </div>
    )

}