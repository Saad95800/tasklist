import { Satellite } from '@mui/icons-material'
import { createSlice } from '@reduxjs/toolkit'
import produce from 'immer'
import { addTaskFunc, deleteTaskFunc, getTaskById, updatetaskFunc } from '../../utils/functions'

// On crée ici tout nos states liées à l'affichage des messages
const initialState = {
    arrays: [ // Définit l'état ititial de l'application, c a d les données qui vont permettre d'avoir notre visuel de part
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
            ],
            spaceId: 1
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
            ],
            spaceId: 1
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
            ],
            spaceId: 1
        },
        {
            id: 4,
            order: 1,
            title: 'En cours',
            tasks: [
            ],
            spaceId: 2
        }
    ],
    displayFormAddArray: false,
    displayFormDeleteArray: false,
    displayFormAddTask: false,
    displayFormEditTask: false,
    displayFormEditArray: false
}

// On crée notre slice
export const ArraySlice = createSlice({
    name: 'array',
    initialState: initialState,
    reducers: {
        // Contient toutes les fonctions liées aux tableaux
        setArrays: (state, action) => {
            state.arrays = action.payload
        },
        addTable: (state, action) => { // Cette fonction va ajouter un nouvel objet (qui représente un tableau dans le state arrays (étape 5))
            // Pour modifier un tableau state, on va d'abord créer une copie de ce tableau dans une variable newArrays
            let newArrays = [...state.arrays]
            newArrays.push({ // On ajoute à ce tableau un nouvel objet qui va contenir les infos saisies par l'utilisateur (title)
                id: state.arrays.length + 1,
                title: action.payload,
                tasks: [],
                order: state.arrays.length + 1
            }) // On récrée un objet identiques aux objets tableaux déjà présents
            state.arrays = newArrays // On écrase l'ancien state en mettrant à la place le nouveau tableay d'arrays crée qui contient le nouveau tableu ajouté
            state.displayFormAddArray = false
        },
        setDisplayFormAddArray: (state, action) => {
            state.displayFormAddArray = action.payload
        },
        setDisplayFormDeleteArray: (state, action) => {
            state.displayFormDeleteArray = action.payload
        },
        setDisplayFormAddTask: (state, action) => {
            state.displayFormAddTask = action.payload
        },
        setDisplayFormEditTask: (state, action) => {
            state.displayFormEditTask = action.payload
        },
        setDisplayFormEditArray: (state, action) => {
            state.displayFormEditArray = action.payload
        },
        deleteTable: (state, action) => {
            // Pour supprimer un élément d'un state tableau, on crée d'abord un tableau vide
            let newArrays = []

            // On parcours le state en cours (liste de tableaux)
            for(let arr of state.arrays){
                if(arr.id !== Number(action.payload)){ // Si le tableau dans l'itération n'est pas celui qu'on veux supprimer, 
                                            // on le met dans le tableau newArray
                    newArrays.push(arr)
                }
                // Si on est dans l'itération du tableau qu'on veux supprimer (arr.id === Number(id)), 
                // on ne rentrera pas dans le if, donc on ajoutera pas ce tableau dans notre nouveau tableau newArray
            }
            // NewArrays sera donc une copie de arrays mais sans le tableau qu'on souhaite supprimer
            state.arrays = newArrays // On écrase le state précédent avec le nouveau tableau qui ne contient pas le tableau qu'on veux supprimer
            // Lorsque le tableau est supprimé du state, il diparaitra automatiquement du html
            // On a conditionné l'afficha HTML à la valeur du state arrays
            state.displayFormDeleteArray = false
        },
        moveArray: (state, action) => {

            let newArrays = [...state.arrays]
    
            for(let array of newArrays){
                
                // Si l'order du tableau de drop est suppérieur à l'order du tableau de drag
    
                if(Number(action.payload.order_array_drop > Number(action.payload.order_array_drag))){
                    // le tableau qui a l'id id_array_drag prend le order order_array_drop
                    // Les tableaux d'order inférieur à order_array_drop et supérieur à order_array_drag on leur order qui fait -1
                    if(array.id.toString() === action.payload.id_array_drag.toString()){
                        array.order = Number(action.payload.order_array_drop)
                    }else if(array.id.toString() === action.payload.id_array_drop.toString()){
                        array.order = array.order - 1
                    }else if(Number(array.order) < Number(action.payload.order_array_drop) && Number(array.order) > Number(action.payload.order_array_drag)){
                        array.order = array.order - 1
                    }   
                    console.log(array) 
                    // Si l'order du tableau de drop est inférieur à l'order du tableau de drag          
                }else if(Number(action.payload.order_array_drop < Number(action.payload.order_array_drag))){
                    // le tableau qui a l'id id_array_drag prend le order order_array_drop
                    // Les tableaux d'order suppérieur à order_array_drop et inférieur à order_array_drag on leur order qui fait -1
                    if(array.id.toString() === action.payload.id_array_drag.toString()){
                        array.order = Number(action.payload.order_array_drop)
                    }else if(array.id.toString() === action.payload.id_array_drop.toString()){
                        array.order = array.order + 1
                    }else if(Number(array.order) > Number(action.payload.order_array_drop) && Number(array.order) < Number(action.payload.order_array_drag)){
                        array.order = array.order + 1
                    } 
                }
    
            }

            state.arrays = newArrays
            
        },
        updateArray: (state, action) => {
            let newArrays = [...state.arrays]
    
            for(let array of newArrays){
                if(array.id.toString() === action.payload.id_array.toString()){
                    array.title = action.payload.title_array
                }
            }
    
            state.arrays = newArrays
            state.DisplayFormEditArray = false
        },
        updateTask: (state, action) => {
            // On modifie dans le state la tâche
            state.arrays = updatetaskFunc(action.payload.id_task, action.payload.intitule, state.arrays)
            state.displayFormEditTask = false
        },
        moveTask: (state, action) => {
            let taskToMove = getTaskById(action.payload.id_task, state.arrays)
            state.arrays = deleteTaskFunc(action.payload.id_task, state.arrays)
            state.arrays = addTaskFunc(taskToMove.intitule, action.payload.id_array_drop, state.arrays)
        },
        addTask: (state, action) => {
            state.arrays = addTaskFunc(action.payload.title, action.payload.id_array, state.arrays)
        },
        deleteTask: (state, action) => {
            state.arrays = deleteTaskFunc(action.payload, state.arrays)
        },
        deleteArrays: (state, action) => {
            let newArray = []
            for(let array of state.arrays){
                if(array.spaceId.toString() !== action.payload.toString() ){
                    newArray.push(array)
                }
            }
            state.arrays = newArray
        },
        deleteArraysSpacesSelected: (state, action) => {
            let newArrays = []
            for(let array of state.arrays){
                if(action.payload.indexOf(array.spaceId) === -1){
                    newArrays.push(array)
                }
            }
            state.arrays = newArrays
        }
    }
})


export const {
    setArrays, 
    setDisplayFormAddArray, 
    addTable, 
    setDisplayFormDeleteArray,
    setDisplayFormAddTask,
    setDisplayFormEditTask,
    setDisplayFormEditArray,
    deleteTable,
    moveArray,
    updateArray,
    updateTask,
    addTask,
    deleteTask,
    moveTask,
    deleteArrays,
    deleteArraysSpacesSelected} = ArraySlice.actions

export default ArraySlice.reducer