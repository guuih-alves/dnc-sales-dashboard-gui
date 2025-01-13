import { configureStore } from "@reduxjs/toolkit";
import createProfileReducer from './slices/createProfile'

const store = configureStore({
    reducer: {
        createProfile: createProfileReducer
    }
})

export type RootSatte =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store