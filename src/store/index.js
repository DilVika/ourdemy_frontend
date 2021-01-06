import {
    configureStore,
} from '@reduxjs/toolkit';
import {authenSlice} from "./authen";
import {catSlice} from "./category";
import {lecCourseSlice} from "./course/lec";

const store = configureStore({
    reducer: {
        authen: authenSlice.reducer,
        cat: catSlice.reducer,
        lecCourse: lecCourseSlice.reducer,
    }
})

export default store