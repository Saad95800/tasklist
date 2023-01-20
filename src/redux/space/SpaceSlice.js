import { createSlice } from '@reduxjs/toolkit'
import { deleteSpaceIDB, deleteSpacesIDB, insertSpaceIDB, updateSpaceIDB } from '../../utils/functions';

// On crée ici tout nos states liées à l'affichage des messages
const initialState = {
    spaces: [],
    viewFormEditSpace: false,
    title: '',
    color: '#ffffff',
    spaceToEdit: null,
    contextSpace: 'edit',
    spacesToDelete: [],
    idSpaceConfirmDelete: null,
    connected: sessionStorage.getItem('connected')
}

// On crée notre slice
export const SpaceSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        setConnected: (state, action) => {
            state.connected = action.payload
        },
        setSpaces: (state, action) => {
            state.spaces = action.payload
        },
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
            newSpaces.push(action.payload)
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
            let spacesStorage = JSON.parse(localStorage.getItem('spaces'))
            state.spaces.map((space, index)=>{
                if(space.id === action.payload){
                    state.spaces.splice(index, 1)
                    spacesStorage.splice(index, 1)
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
            
            deleteSpacesIDB([...state.spacesToDelete])

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


export const {setConnected, setSpaces, setIdSpaceConfirmDelete, deleteSpacesSelected, setSpacesToDelete, deleteSpace, setTitle, setSpaceToEdit, setViewFormEditSpace, updateSpace, addSpace, setContextSpace, setColor} = SpaceSlice.actions

export default SpaceSlice.reducer