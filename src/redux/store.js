import { configureStore } from '@reduxjs/toolkit'
import ArrayReducer from './array/ArraySlice'
import messageReducer from './message/MessageSlice'

export const store = configureStore({
    reducer: {
        message: messageReducer,
        array: ArrayReducer
    }
})