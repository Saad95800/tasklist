import { createSlice } from '@reduxjs/toolkit'

// On crée ici tout nos states liées à l'affichage des messages
const initialState = {
    spaces: [
        {
            id: 1,
            title: 'Conduite de projets'
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
    spaceToEdit: null
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
        }
    }
})


export const {setTitle, setSpaceToEdit, setViewFormEditSpace} = SpaceSlice.actions

export default SpaceSlice.reducer