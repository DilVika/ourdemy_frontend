import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";


import Home from "./pages/home";
import store from "./store";
import {Provider} from "react-redux";
import NotFound from "./pages/NotFound";
import AuthRoute from "./components/AuthRoute";
import Profile from "./pages/Profile";
import LecturerRoute from "./components/LecturerRoute";
import CourseManage from "./pages/CourseManage";
import CreateCourse from "./pages/CreateCourse";
import UpdateCourse from "./pages/UpdateCourse";

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
                    <Route exact path={"/course/create"}>
                        <CreateCourse/>
                    </Route>
                    <Route exact path={"/course/update/:id"}>
                        <UpdateCourse />
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
