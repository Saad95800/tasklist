import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    texte: '',
    typeMessage: 'info'
}

export const MessageSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        displayMessage: (state, action) => {
            state.texte = action.payload.texte
            state.typeMessage = action.payload.typeMessage
        }
    }
})


export const {displayMessage} = MessageSlice.actions

export default MessageSlice.reducer