import {
    configureStore,
} from '@reduxjs/toolkit';
import {authenSlice} from "./authen";
import {catSlice} from "./category";

const store = configureStore({
    reducer: {
        authen: authenSlice.reducer,
        cat: catSlice.reducer
    }
})

export default store