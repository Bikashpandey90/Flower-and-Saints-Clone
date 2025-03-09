import {configureStore} from '@reduxjs/toolkit'
import chatReducer from '../reducer/chat-reducer' 
const store=configureStore({
    reducer:{
        //global state mount 
        chat:chatReducer

    }
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
export default store