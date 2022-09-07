import reducer from '../reducers';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer:{reducer},
    devTools: true
})


export default store;