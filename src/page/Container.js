import React, {useState, useEffect} from 'react'
import Array from '../component/Array'
import FormAdd from '../component/FormAdd'
import FormSup from '../component/FormSup'
import { v4 as uuidv4 } from 'uuid';
import FormAddTask from '../component/FormAddTask'
import {Link} from 'react-router-dom'
import FormEditTask from '../component/FormEditTask';
import FormEditArray from '../component/FormEditArray'
import { useSelector } from 'react-redux'
import { store } from '../redux/store';
import Message from '../component/Message';
// import { displayMessage } from '../redux/message/MessageSlice';
import { 
    setArrays, 
    setDisplayFormAddArray, 
    addTable, 
    setDisplayFormDeleteArray,
    setDisplayFormAddTask,
    setDisplayFormEditTask,
    setDisplayFormEditArray } from '../redux/array/ArraySlice';

// On créer un composant par élément visuel
export default function Container(){

    const texte = useSelector((state) => state.message.texte)
    const viewMessage = useSelector((state) => state.message.viewMessage)
    const typeMessage = useSelector((state) => state.message.typeMessage)

    const arrays = useSelector((state) => state.array.arrays)
    const displayFormAddArray = useSelector((state) => state.array.displayFormAddArray)
    const displayFormDeleteArray = useSelector((state) => state.array.displayFormDeleteArray)
    const displayFormAddTask = useSelector((state) => state.array.displayFormAddTask)
    const displayFormEditTask = useSelector((state) => state.array.displayFormEditTask)
    const displayFormEditArray = useSelector((state) => state.array.displayFormEditArray)
    
    // étape 1 (Ajout de tableau) - On défénit un state qui va définir les élément dynamiques de la page



    // étape 1 (Supression de tableau) - Créer un state qui indiquera si le formulaire de suppression va s'afficher ou pas

    const [taskToEdit, setTaskToEdit] = useState(null)
    const [arrayToEdit, setArrayToEdit] = useState(null)

    const displayFormArray = (id_array, title_array) => {
        setArrayToEdit({
            id: id_array,
            title: title_array
        })
        store.dispatch(setDisplayFormEditArray(true))
    }

    const closeFromEditTask = () => {
        store.dispatch(setDisplayFormEditTask(false))
    }

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
        store.dispatch(setDisplayFormEditTask(false))

    }

    const displayFormUpdateTask = (id_task) =>{
        store.dispatch(setDisplayFormEditTask(true)) // On affiche le formulaire de modification de tâche
        // On récupère la tâche par son id et on la transmet au formulaire de modifiction de tâche
        setTaskToEdit(getTaskById(id_task))
    }

  

    // étape 2 (Supression de tableau) - Créer un composant qui va contenir un formualire de suppression de tableau
    // étape 4 (Supression de tableau) - On crée la fonction de suppression de tableau

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
        store.dispatch(setDisplayFormAddArray(false))
    }
    const closeFormDeleteArray = () =>{
        store.dispatch(setDisplayFormDeleteArray(false))
    }
    const closeFormAddTask = () =>{
        store.dispatch(setDisplayFormAddTask(false))
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

    const closeFromEditArray = () => {
        store.dispatch(setDisplayFormEditArray(false))
    }



    let arraySorted = arrays.slice().sort((a, b) => (a.order > b.order ? 1 : -1))

    // étape 2 (Ajout de tableau) - On créer le HTML du composant (container) (D'abors les visuels Statiques)
    // étape 3 (Ajout de tableau) - On créer le HTML des visuels dynamiques
    // étape 4 (Ajout de tableau) - Créer un composant contenant un formulaire d'ajout de tableau
    // étape 5 (Ajout de tableau) - Une fois le composant du formulaire d'ajout de tableau crée, on crée la fonction qui va ajouter un tableau dans le state arrays
    return (
        <div className="container">
            {viewMessage && <Message texte={texte} typeMessage={typeMessage} />}
            <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <div className="d-flex">

            <div className='btn btn-info m-1' onClick={()=>{
                store.dispatch(setDisplayFormAddArray(true))
            }} >Ajouter un tableau</div>

            <div className='btn btn-info m-1' onClick={()=>{
                store.dispatch(setDisplayFormDeleteArray(true))
            }} >Supprimer un tableau</div>

            <div className='btn btn-info m-1' onClick={()=>{
                store.dispatch(setDisplayFormAddTask(true))
            }} >Ajouter une tâche</div>
            
                {displayFormAddArray && <FormAdd addTable={addTable} closeFormAddArray={closeFormAddArray} />}
                {/* étape 3 (Supression de tableau) - On affiche le formulaire de suppression de tableau en conditionnant son affichage à la valeur du state displayFormDeleteArray */}
                {displayFormDeleteArray && <FormSup arrays={arrays} closeFormDeleteArray={closeFormDeleteArray} />}
                {displayFormAddTask && <FormAddTask arrays={arrays} addTask={addTask} closeFormAddTask={closeFormAddTask}/>}
                {displayFormEditTask && <FormEditTask task={taskToEdit} updateTask={updateTask} closeFromEditTask={closeFromEditTask} />}
                {displayFormEditArray && <FormEditArray closeFromEditArray={closeFromEditArray} array={arrayToEdit} />}
            </div>
            <div className="d-flex" style={{overflowX: 'scroll', minHeight: '500px'}}>
                {arraySorted.map((array, index)=>{ // Comme on est censé avoir plusieurs tableaux, on utilise une boucle pour afficher un composant Array par tableau dans le state
                    return <Array 
                                key={index} 
                                data={array} 
                                deleteTask={deleteTask} 
                                moveTask={moveTask} 
                                displayFormUpdateTask={displayFormUpdateTask}
                                displayFormArray={displayFormArray}
                                />
                })}
            </div>
        </div>
    )

}