import React, {useState, useEffect} from 'react'
import Array from '../component/Array'
import FormAdd from '../component/FormAdd'
import FormSup from '../component/FormSup'
import FormAddTask from '../component/FormAddTask'
import {Link, useParams} from 'react-router-dom'
import FormEditTask from '../component/FormEditTask'
import FormEditArray from '../component/FormEditArray'
import { useSelector } from 'react-redux'
import { store } from '../redux/store'

import { 
    setArrays, 
    setDisplayFormAddArray, 
    addTable, 
    setDisplayFormDeleteArray,
    setDisplayFormAddTask,
    setDisplayFormEditTask,
    setDisplayFormEditArray } from '../redux/array/ArraySlice';
import { getTaskById } from '../utils/functions'
import { setTasks } from '../redux/task/TaskSlice'

// On créer un composant par élément visuel
export default function Container(){

    useEffect(()=>{
        // Code qui récupère les arrays dans le localstorage et le met dans le state arrays
        let arrays = JSON.parse(localStorage.getItem('arrays'))
        let tasks = JSON.parse(localStorage.getItem('tasks'))

        store.dispatch(setArrays(arrays))
        store.dispatch(setTasks(tasks))
    }, [])

    const { id } = useParams()

    const arrays = useSelector((state) => state.array.arrays)
    const displayFormAddArray = useSelector((state) => state.array.displayFormAddArray)
    const displayFormDeleteArray = useSelector((state) => state.array.displayFormDeleteArray)
    const displayFormAddTask = useSelector((state) => state.array.displayFormAddTask)
    const displayFormEditTask = useSelector((state) => state.array.displayFormEditTask)
    const displayFormEditArray = useSelector((state) => state.array.displayFormEditArray)
    
    // étape 1 (Ajout de tableau) - On défénit un state qui va définir les élément dynamiques de la page

    const filterArrays = (spaceId, arrays) => {
        return [...arrays].filter(array => array.spaceId.toString() === spaceId.toString())
    }

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

    const displayFormUpdateTask = (id_task) =>{
        store.dispatch(setDisplayFormEditTask(true)) // On affiche le formulaire de modification de tâche
        // On récupère la tâche par son id et on la transmet au formulaire de modifiction de tâche
        setTaskToEdit(getTaskById(id_task, arrays))
    }

    // étape 2 (Supression de tableau) - Créer un composant qui va contenir un formualire de suppression de tableau
    // étape 4 (Supression de tableau) - On crée la fonction de suppression de tableau

    const closeFormAddArray = () =>{
        store.dispatch(setDisplayFormAddArray(false))
    }
    const closeFormDeleteArray = () =>{
        store.dispatch(setDisplayFormDeleteArray(false))
    }
    const closeFormAddTask = () =>{
        store.dispatch(setDisplayFormAddTask(false))
    }

    const closeFromEditArray = () => {
        store.dispatch(setDisplayFormEditArray(false))
    }

    let arraySorted = filterArrays(id, arrays).slice().sort((a, b) => (a.order > b.order ? 1 : -1))

    // étape 2 (Ajout de tableau) - On créer le HTML du composant (container) (D'abors les visuels Statiques)
    // étape 3 (Ajout de tableau) - On créer le HTML des visuels dynamiques
    // étape 4 (Ajout de tableau) - Créer un composant contenant un formulaire d'ajout de tableau
    // étape 5 (Ajout de tableau) - Une fois le composant du formulaire d'ajout de tableau crée, on crée la fonction qui va ajouter un tableau dans le state arrays
    return (
        <div className="container">
            
            <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/spaces" className="btn btn-primary">Espaces</Link>
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
                {displayFormAddTask && <FormAddTask arrays={arrays} closeFormAddTask={closeFormAddTask}/>}
                {displayFormEditTask && <FormEditTask task={taskToEdit} closeFromEditTask={closeFromEditTask} />}
                {displayFormEditArray && <FormEditArray closeFromEditArray={closeFromEditArray} array={arrayToEdit} />}
            </div>
            <div className="d-flex" style={{overflowX: 'scroll', minHeight: '500px'}}>
                {arraySorted.map((array, index)=>{ // Comme on est censé avoir plusieurs tableaux, on utilise une boucle pour afficher un composant Array par tableau dans le state
                    return <Array 
                                key={index} 
                                data={array}
                                displayFormUpdateTask={displayFormUpdateTask}
                                displayFormArray={displayFormArray}
                                />
                })}
            </div>
        </div>
    )

}