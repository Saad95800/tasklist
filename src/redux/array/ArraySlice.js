import { Satellite } from '@mui/icons-material'
import { createSlice } from '@reduxjs/toolkit'
import produce from 'immer'
import { addTaskFunc, deleteArrayIDB, deleteTaskFunc, getTaskById, insertArrayIDB, updatetaskFunc } from '../../utils/functions'
import { v4 as uuidv4 } from 'uuid';

// On crée ici tout nos states liées à l'affichage des messages
const initialState = {
    arrays: [],
    displayFormAddArray: false,
    displayFormDeleteArray: false,
    displayFormAddTask: false,
    displayFormEditTask: false,
    displayFormEditArray: false,
    idTaskConfirmDelete: null
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

            // On ajoute à ce tableau un nouvel objet qui va contenir les infos saisies par l'utilisateur (title)
            let newArray = { 
                id: uuidv4(),
                title: action.payload.title,
                order: state.arrays.length + 1,
                spaceId: action.payload.spaceId
            }

            insertArrayIDB(newArray)
            state.arrays.push(newArray)
           
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

            deleteArrayIDB(action.payload.toString())
            // Pour supprimer un élément d'un state tableau, on crée d'abord un tableau vide
            let newArrays = []

            // On parcours le state en cours (liste de tableaux)
            for(let arr of state.arrays){
                if(arr.id.toString() !== Number(action.payload.toString())){ // Si le tableau dans l'itération n'est pas celui qu'on veux supprimer, 
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

            localStorage.setItem('arrays', JSON.stringify(newArrays))
            state.arrays = newArrays
            
        },
        updateArray: (state, action) => {

            let newArray = {
                id: action.payload.id_array,
                title: action.payload.title_array
            }

            let newArrays = [...state.arrays]
    
            // for(let array of newArrays){
            //     console.log(array)
            //     console.log(action.payload)
            //     if(array.id.toString() === action.payload.id.toString()){
            //         array.title = action.payload.title_array
            //     }
            // }

            state.arrays = newArrays
            state.DisplayFormEditArray = false
        },
        deleteArrays: (state, action) => {
            let newArrays = []
            for(let array of state.arrays){
                if(array.spaceId.toString() !== action.payload.toString() ){
                    newArrays.push(array)
                }
            }
            localStorage.setItem('arrays', JSON.stringify(newArrays))
            state.arrays = newArrays
        },
        deleteArraysSpacesSelected: (state, action) => {
            let newArrays = []
            for(let array of state.arrays){
                if(action.payload.indexOf(array.spaceId) === -1){
                    newArrays.push(array)
                }
            }
            localStorage.setItem('arrays', JSON.stringify(newArrays))
            state.arrays = newArrays
        },
        setIdTaskConfirmDelete: (state, action) => {
            state.idTaskConfirmDelete = action.payload
        },
    }
})


export const {
    setIdTaskConfirmDelete,
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
    deleteArrays,
    deleteArraysSpacesSelected} = ArraySlice.actions

export default ArraySlice.reducer