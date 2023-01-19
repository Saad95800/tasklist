import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { deleteTaskIDB, insertTaskIDB, updateTaskIDB } from '../../utils/functions';
// On crée ici tout nos states liées à l'affichage des messages
const initialState = {
    tasks: []
}

// On crée notre slice
export const TaskSlice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        // Contient toutes les fonctions liées aux tableaux
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        updateTask: (state, action) => {
            // On modifie dans le state la tâche

            updateTaskIDB({
                id: action.payload.id_task, 
                intitule: action.payload.intitule
            })

            let newTasks = [...state.tasks]
            for(let task of newTasks){
                if(task.id === action.payload.id_task){
                    task.intitule = action.payload.intitule
                }
            }

            state.tasks = newTasks
        },
        moveTask: (state, action) => {
            
            let newTasks = [...state.tasks]
            for(let task of newTasks){
                if(task.id.toString() === action.payload.id_task.toString()){
                    task.arrayId = action.payload.id_array_drop.toString()
                }
            }
            state.arrays = newTasks
        },
        addTask: (state, action) => {
            let newTask = {
                id: uuidv4(),
                intitule: action.payload.title,
                arrayId: action.payload.id_array
            }

            insertTaskIDB(newTask)

            state.tasks.push(newTask)
        },
        deleteTask: (state, action) => {
            
            deleteTaskIDB(action.payload.toString())

            state.tasks.map((task, index)=>{
                if(task.id.toString() === action.payload.toString()){
                    state.tasks.splice(index, 1)
                }
            })
            
        },
    }
})


export const {
    setTasks,
    moveTask,
    updateTask,
    addTask,
    deleteTask
} = TaskSlice.actions

export default TaskSlice.reducer