import React, {useState} from 'react'
import Array from '../component/Array'
import FormAdd from '../component/FormAdd'
import FormSup from '../component/FormSup'
import { v4 as uuidv4 } from 'uuid';
import FormAddTask from '../component/FormAddTask'
import {Link} from 'react-router-dom'
import FormEditTask from '../component/FormEditTask';
import FormEditArray from '../component/FormEditArray'

// On créer un composant par élément visuel
export default function Container(){


    // étape 1 (Ajout de tableau) - On défénit un state qui va définir les élément dynamiques de la page
    const [arrays, setArrays] = useState([ // Définit l'état ititial de l'application, c a d les données qui vont permettre d'avoir notre visuel de part
        // On stock les tableaux dans un state parce qu'ils s'affichent dynamiquement
        // c a d qu'on peut les supprimer, en ajouter ou les modifier (potentiellement)    
        // on ne modifie jamais le html directement (appendChild, querySelector, mais on  modifie à chaque fois ce tableau de states)
        {
            id: 1,
            order: 4,
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
            order: 3,
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
            order: 2,
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
            order: 1,
            title: 'En cours',
            tasks: [
            ]
        }
    ])

    const [displayFormAddArray, setDisplayFormAddArray] = useState(false)
    // étape 1 (Supression de tableau) - Créer un state qui indiquera si le formulaire de suppression va s'afficher ou pas
    const [displayFormDeleteArray, setDisplayFormDeleteArray] = useState(false) // Au départ il ne s'affiche pas
    const [displayFormAddTask, setDisplayFormAddTask] = useState(false)
    const [displayFormEditTask, setDisplayFormEditTask] = useState(false)
    const [displayFormEditArray, setDisplayFormEditArray] = useState(false)

    const [taskToEdit, setTaskToEdit] = useState(null)
    const [arrayToEdit, setArrayToEdit] = useState(null)

    const displayFormArray = (id_array, title_array) => {
        setArrayToEdit({
            id: id_array,
            title: title_array
        })
        setDisplayFormEditArray(true)
    }

    const closeFromEditTask = () => {
        setDisplayFormEditTask(false)
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
        setDisplayFormEditTask(false)

    }

    const displayFormUpdateTask = (id_task) =>{
        setDisplayFormEditTask(true) // On affiche le formulaire de modification de tâche
        // On récupère la tâche par son id et on la transmet au formulaire de modifiction de tâche
        setTaskToEdit(getTaskById(id_task))
    }

    const addTable = (title) => { // Cette fonction va ajouter un nouvel objet (qui représente un tableau dans le state arrays (étape 5))
        // Pour modifier un tableau state, on va d'abord créer une copie de ce tableau dans une variable newArrays
        let newArrays = [...arrays]
        newArrays.push({ // On ajoute à ce tableau un nouvel objet qui va contenir les infos saisies par l'utilisateur (title)
            id: arrays.length + 1,
            title: title,
            tasks: [],
            order: arrays.length + 1
        }) // On récrée un objet identiques aux objets tableaux déjà présents
        setArrays(newArrays) // On écrase l'ancien state en mettrant à la place le nouveau tableay d'arrays crée qui contient le nouveau tableu ajouté
    }   

    // étape 2 (Supression de tableau) - Créer un composant qui va contenir un formualire de suppression de tableau
    // étape 4 (Supression de tableau) - On crée la fonction de suppression de tableau
    const deleteTable = (id) => {
        // Pour supprimer un élément d'un state tableau, on crée d'abord un tableau vide
        let newArrays = []
        
        // On parcours le state en cours (liste de tableaux)
        for(let arr of arrays){
            if(arr.id !== Number(id)){ // Si le tableau dans l'itération n'est pas celui qu'on veux supprimer, 
                                       // on le met dans le tableau newArray
                newArrays.push(arr)
            }
            // Si on est dans l'itération du tableau qu'on veux supprimer (arr.id === Number(id)), 
            // on ne rentrera pas dans le if, donc on ajoutera pas ce tableau dans notre nouveau tableau newArray
        }
        // NewArrays sera donc une copie de arrays mais sans le tableau qu'on souhaite supprimer
        setArrays(newArrays) // On écrase le state précédent avec le nouveau tableau qui ne contient pas le tableau qu'on veux supprimer
        // Lorsque le tableau est supprimé du state, il diparaitra automatiquement du html
        // On a conditionné l'afficha HTML à la valeur du state arrays
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

    const closeFromEditArray = () => {
        setDisplayFormEditArray(false)
    }

    const updateArray = (id_array, title_array) => {

        let newArrays = [...arrays]

        for(let array of newArrays){
            if(array.id.toString() === id_array.toString()){
                array.title = title_array
            }
        }

        setArrays(newArrays)
        setDisplayFormEditArray(false)

    }

    const moveArray = (id_array_drag, order_array_drag, id_array_drop, order_array_drop) => {

        let newArrays = [...arrays]

        for(let array of newArrays){
            
            // Si l'order du tableau de drop est suppérieur à l'order du tableau de drag

            if(Number(order_array_drop > Number(order_array_drag))){
                // le tableau qui a l'id id_array_drag prend le order order_array_drop
                // Les tableaux d'order inférieur à order_array_drop et supérieur à order_array_drag on leur order qui fait -1
                if(array.id.toString() === id_array_drag.toString()){
                    array.order = Number(order_array_drop)
                }else if(array.id.toString() === id_array_drop.toString()){
                    array.order = array.order - 1
                }else if(Number(array.order) < Number(order_array_drop) && Number(array.order) > Number(order_array_drag)){
                    array.order = array.order - 1
                }      
                // Si l'order du tableau de drop est inférieur à l'order du tableau de drag          
            }else if(Number(order_array_drop < Number(order_array_drag))){
                // le tableau qui a l'id id_array_drag prend le order order_array_drop
                // Les tableaux d'order suppérieur à order_array_drop et inférieur à order_array_drag on leur order qui fait -1
                if(array.id.toString() === id_array_drag.toString()){
                    array.order = Number(order_array_drop)
                }else if(array.id.toString() === id_array_drop.toString()){
                    array.order = array.order + 1
                }else if(Number(array.order) > Number(order_array_drop) && Number(array.order) < Number(order_array_drag)){
                    array.order = array.order + 1
                }  
            }
            

        }
        setArrays(newArrays)
    }


    let arraySorted = arrays.sort((a, b) => (a.order > b.order ? 1 : -1))

    

    // étape 2 (Ajout de tableau) - On créer le HTML du composant (container) (D'abors les visuels Statiques)
    // étape 3 (Ajout de tableau) - On créer le HTML des visuels dynamiques
    // étape 4 (Ajout de tableau) - Créer un composant contenant un formulaire d'ajout de tableau
    // étape 5 (Ajout de tableau) - Une fois le composant du formulaire d'ajout de tableau crée, on crée la fonction qui va ajouter un tableau dans le state arrays
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
                {/* étape 3 (Supression de tableau) - On affiche le formulaire de suppression de tableau en conditionnant son affichage à la valeur du state displayFormDeleteArray */}
                {displayFormDeleteArray && <FormSup arrays={arrays} deleteTable={deleteTable} closeFormDeleteArray={closeFormDeleteArray} />}
                {displayFormAddTask && <FormAddTask arrays={arrays} addTask={addTask} closeFormAddTask={closeFormAddTask}/>}
                {displayFormEditTask && <FormEditTask task={taskToEdit} updateTask={updateTask} closeFromEditTask={closeFromEditTask} />}
                {displayFormEditArray && <FormEditArray closeFromEditArray={closeFromEditArray} array={arrayToEdit} updateArray={updateArray} />}
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
                                moveArray={moveArray}
                                />
                })}
            </div>
        </div>
    )

}