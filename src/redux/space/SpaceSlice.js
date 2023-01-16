import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

// On crée ici tout nos states liées à l'affichage des messages
const initialState = {
    spaces: [],
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
            localStorage.setItem('spaces', JSON.stringify(newSpaces))
            state.spaces = newSpaces
            state.viewFormEditSpace = false
        },
        addSpace: (state, action) => {
            let newSpaces = [...state.spaces]
            let newSpace = {
                id: uuidv4(),
                title: action.payload.title_space,
                color: action.payload.color
            }
            newSpaces.push(newSpace)
            let spacesStorage = JSON.parse(localStorage.getItem('spaces'))
            spacesStorage.push(newSpace)
            spacesStorage = JSON.stringify(spacesStorage)
            localStorage.setItem('spaces', spacesStorage)
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
            localStorage.setItem('spaces', JSON.stringify(spacesStorage))
        },
        setSpacesToDelete: (state, action) => {
            

            if(state.spacesToDelete.indexOf(action.payload) === -1){
                state.spacesToDelete.push(action.payload)
            }else{
                state.spacesToDelete.splice(state.spacesToDelete.indexOf(action.payload), 1)
            }

        },
        deleteSpacesSelected: (state, action) => {
            let spacesStorage = JSON.parse(localStorage.getItem('spaces'))
            for(let spaceId of state.spacesToDelete){
                state.spaces.map((space, index)=>{
                    if(spaceId === space.id){
                        state.spaces.splice(index, 1)
                        spacesStorage.splice(index, 1)
                    }
                })
            }
            localStorage.setItem('spaces', JSON.stringify(spacesStorage))

        },
        setIdSpaceConfirmDelete: (state, action) => {
            state.idSpaceConfirmDelete = action.payload
        },
    }
})


export const {setSpaces, setIdSpaceConfirmDelete, deleteSpacesSelected, setSpacesToDelete, deleteSpace, setTitle, setSpaceToEdit, setViewFormEditSpace, updateSpace, addSpace, setContextSpace, setColor} = SpaceSlice.actions

export default SpaceSlice.reducer