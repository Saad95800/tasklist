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
    ]
}

// On crée notre slice
export const SpaceSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        
    }
})


export const {} = SpaceSlice.actions

export default SpaceSlice.reducer