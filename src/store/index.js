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
import {listSlice} from "./course/home/list";
import {favSlice} from "./course/fav/fav";
import {highLightSlice} from "./course/home/highlights";
import {mostViewedSlice} from "./course/home/mostViewed";
import {mostRegSlice} from "./course/home/mostReg";
import {newestSlice} from "./course/home/newest";
import {contentSlice} from "./course/detail/content";

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
        list: listSlice.reducer,
        fav: favSlice.reducer,
        highlight: highLightSlice.reducer,
        mostViewed: mostViewedSlice.reducer,
        mostReg: mostRegSlice.reducer,
        newest: newestSlice.reducer,
        content: contentSlice.reducer,
    }
})

export default store