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
        },
        {
            id: 3,
            title: 'Tableau de bienvenue',
            color: "#fff"
        },
        {
            id: 4,
            title: 'Space 4',
            color: "#fff"
        },
        {
            id: 5,
            title: 'Space 5',
            color: "#fff"
        },
        {
            id: 6,
            title: 'Space 6',
            color: "#fff"
        },
        {
            id: 7,
            title: 'Space 7',
            color: "#fff"
        },
        {
            id: 8,
            title: 'Space 8',
            color: "#fff"
        },
        {
            id: 9,
            title: 'Space 9',
            color: "#fff"
        },
        {
            id: 10,
            title: 'Space 10',
            color: "#fff"
        },
        {
            id: 11,
            title: 'Space 11',
            color: "#fff"
        },
        {
            id: 12,
            title: 'Space 12',
            color: "#fff"
        },
        {
            id: 13,
            title: 'Space 13',
            color: "#fff"
        },
        {
            id: 14,
            title: 'Space 14',
            color: "#fff"
        },
        {
            id: 15,
            title: 'Space 15',
            color: "#fff"
        },
        {
            id: 16,
            title: 'Space 16',
            color: "#fff"
        },
        {
            id: 17,
            title: 'Space 17',
            color: "#fff"
        }
    ],
    viewFormEditSpace: false,
    title: '',
    color: '#ffffff',
    spaceToEdit: null,
    contextSpace: 'edit',
    spacesToDelete: [],
    idSpaceConfirmDelete: null
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
                    space.color = action.payload.color
                }
            }
    
            state.spaces = newSpaces
            state.viewFormEditSpace = false
        },
        addSpace: (state, action) => {
            let newSpaces = [...state.spaces]

            newSpaces.push({
                id: uuidv4(),
                title: action.payload.title_space,
                color: action.payload.color
            })

            state.spaces = newSpaces
            state.viewFormEditSpace = false
        },
        setContextSpace: (state, action) => {
            state.contextSpace = action.payload
        },
        setColor: (state, action) => {
            state.color = action.payload
        },
        deleteSpace: (state, action) => {
            state.spaces.map((space, index)=>{
                if(space.id === action.payload){
                    state.spaces.splice(index, 1)
                }
            })
        },
        setSpacesToDelete: (state, action) => {
            

            if(state.spacesToDelete.indexOf(action.payload) === -1){
                state.spacesToDelete.push(action.payload)
            }else{
                state.spacesToDelete.splice(state.spacesToDelete.indexOf(action.payload), 1)
            }

        },
        deleteSpacesSelected: (state, action) => {
            for(let spaceId of state.spacesToDelete){
                state.spaces.map((space, index)=>{
                    if(spaceId === space.id){
                        state.spaces.splice(index, 1)
                    }
                })
            }
        },
        setIdSpaceConfirmDelete: (state, action) => {
            state.idSpaceConfirmDelete = action.payload
        },
    }
})


export const {setIdSpaceConfirmDelete, deleteSpacesSelected, setSpacesToDelete, deleteSpace, setTitle, setSpaceToEdit, setViewFormEditSpace, updateSpace, addSpace, setContextSpace, setColor} = SpaceSlice.actions

export default SpaceSlice.reducer