import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

// On crée ici tout nos states liées à l'affichage des messages
const initialState = {
    spaces: [
        {
            id: 1,
            title: 'Conduite de projets',
            color: "#cccccc"
        },
        {
            id: 2,
            title: 'Taches quotidiennes'
        },
        {
            id: 3,
            title: 'Tableau de bienvenue'
        }
    ],
    viewFormEditSpace: false,
    title: '',
    spaceToEdit: null,
    contextSpace: 'edit'
}

// On crée notre slice
export const SpaceSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setSpaceToEdit: (state, action) => {
            state.spaceToEdit = action.payload
        },
        setViewFormEditSpace: (state, action) => {
            state.viewFormEditSpace = action.payload
        },
        updateSpace: (state, action) => {
            let newSpaces = [...state.spaces]
    
            for(let space of newSpaces){
                if(space.id.toString() === action.payload.id_space.toString()){
                    space.title = action.payload.title_space
                }
            }
    
            state.spaces = newSpaces
            state.viewFormEditSpace = false
        },
        addSpace: (state, action) => {
            let newSpaces = [...state.spaces]

            newSpaces.push({
                id: uuidv4(),
                title: action.payload.title_space
            })

            state.spaces = newSpaces
            state.viewFormEditSpace = false
        },
        setContextSpace: (state, action) => {
            state.contextSpace = action.payload
        }
    }
})


export const {setTitle, setSpaceToEdit, setViewFormEditSpace, updateSpace, addSpace, setContextSpace} = SpaceSlice.actions

export default SpaceSlice.reducer