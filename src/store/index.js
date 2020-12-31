import {
    configureStore,
} from '@reduxjs/toolkit';
import {authenSlice} from "./authen";

const store = configureStore({
    reducer: {
        authen: authenSlice.reducer
    }
})

export default store