import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import infoUserReducer from "./infoUserSlice";
import {useDispatch} from "react-redux";



const index = configureStore({
    reducer: {
        infoUser: infoUserReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof index.getState>

export type AppDispatch = typeof index.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default index
