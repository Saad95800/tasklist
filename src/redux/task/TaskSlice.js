import { createSlice } from '@reduxjs/toolkit'
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
        // updateTask: (state, action) => {
        //     let newArrays = updatetaskFunc(action.payload.id_task, action.payload.intitule, state.arrays)
        //     localStorage.setItem('arrays', JSON.stringify(newArrays))
        //     // On modifie dans le state la tâche
        //     state.arrays = newArrays
        //     state.displayFormEditTask = false
        // },
        moveTask: (state, action) => {
            
            let newTasks = [...state.tasks]
            for(let task of newTasks){
                if(task.id.toString() === action.payload.id_task.toString()){
                    task.arrayId = action.payload.id_array_drop.toString()
                }
            }
            state.arrays = newTasks
        },
        // addTask: (state, action) => {
        //     let newArrays = addTaskFunc(action.payload.title, action.payload.id_array, state.arrays)
        //     localStorage.setItem('arrays', JSON.stringify(newArrays))
        //     state.arrays = newArrays
        // },
        // deleteTask: (state, action) => {
        //     let newArrays = deleteTaskFunc(action.payload, state.arrays)
        //     localStorage.setItem('arrays', JSON.stringify(newArrays))
        //     state.arrays = newArrays
        // },
    }
})


export const {
    setTasks,
    moveTask
} = TaskSlice.actions

export default TaskSlice.reducer