import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from "react-router-dom";


import Home from "./pages/home";
import store from "./store";
import {Provider} from "react-redux";
import NotFound from "./pages/NotFound";
import AuthRoute from "./components/AuthRoute";
import Profile from "./pages/Profile";
import LecturerRoute from "./components/LecturerRoute";
import ViewVideo from "./pages/ViewVideo";
import CourseManage from "./pages/CourseManage";
import CreateCourse from "./pages/CreateCourse";
import UpdateCourse from "./pages/UpdateCourse";
import CourseContent from "./pages/CourseContent";
import {fetchCurrentCourse} from "./store/course/lec";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <AuthRoute exact path="/profile">
                        <Profile/>
                    </AuthRoute>
                    <LecturerRoute exact path={"/course/manage"}>
                        <CourseManage/>
                    </LecturerRoute>
                    <LecturerRoute exact path={"/course/create"}>
                        <CreateCourse/>
                    </LecturerRoute>
                    <LecturerRoute exact path={"/course/update/:id"}>
                        <UpdateCourse/>
                    </LecturerRoute>
                    <LecturerRoute exact path={"/course/content/:id"}>
                        <CourseContent/>
                    </LecturerRoute>
                    {/*<Route exact path={"/course/view"}>*/}
                    {/*    <ViewVideo/>*/}
                    {/*</Route>*/}
                    <Route exact path={"/course/view/:vid"}>
                        <ViewVideo/>
                    </Route>
                    <Route path="*">
                        <NotFound/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}

store.subscribe(App)

export default App;
