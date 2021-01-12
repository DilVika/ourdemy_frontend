import {
    configureStore,
} from '@reduxjs/toolkit';
import {authenSlice} from "./authen";
import {catSlice} from "./category";
import {lecCourseSlice} from "./course/lec";
import {searchSlice} from "./course/search";
import {videoSlice} from "./course/video";
import {adminAuthenSlice} from "./admin/authen";
import {adminCatSlice} from "./admin/cat";
import {adminUsersSlice} from "./admin/user";
import {adminCoursesSlice} from "./admin/courses";
import {detailSlice} from "./course/detail/detail";
import {joinSlice} from "./course/detail/join";
import {userResetPasswordSlice} from "./authen/reset";
import {commentsSlice} from "./course/detail/comment";
import {relSlice} from "./course/detail/relevance";

const store = configureStore({
    reducer: {
        authen: authenSlice.reducer,
        reset: userResetPasswordSlice.reducer,
        cat: catSlice.reducer,
        lecCourse: lecCourseSlice.reducer,
        search: searchSlice.reducer,
        video: videoSlice.reducer,
        adminAuth: adminAuthenSlice.reducer,
        adminCats: adminCatSlice.reducer,
        adminUsers: adminUsersSlice.reducer,
        adminCourses: adminCoursesSlice.reducer,
        detail: detailSlice.reducer,
        join: joinSlice.reducer,
        comment: commentsSlice.reducer,
        rel: relSlice.reducer,
    }
})

export default store