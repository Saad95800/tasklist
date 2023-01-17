import { configureStore } from '@reduxjs/toolkit'
import TaskReducer from './task/TaskSlice'
import ArrayReducer from './array/ArraySlice'
import messageReducer from './message/MessageSlice'
import SpaceReducer from './space/SpaceSlice'

export const store = configureStore({
    reducer: {
        message: messageReducer,
        array: ArrayReducer,
        task: TaskReducer,
        space: SpaceReducer
    }
})