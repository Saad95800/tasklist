import { createSlice } from '@reduxjs/toolkit'

// On crée ici tout nos states liées à l'affichage des messages
const initialState = {
    viewMessage: false,
    texte: '',
    typeMessage: ''
}

// On crée notre slice
export const MessageSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        // Contient toutes les fonctions liées à l'affichage des messages
        displayMessage: (state, action) => {
            state.viewMessage = true
            state.texte = action.payload.texte
            state.typeMessage = action.payload.typeMessage
        },
        hideMessage: (state, action) => {
            state.viewMessage = false
            state.texte = ''
            state.typeMessage = ''
        }
    }
})


export const {displayMessage, hideMessage} = MessageSlice.actions

export default MessageSlice.reducer