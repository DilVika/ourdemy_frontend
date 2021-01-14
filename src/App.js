import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import Home from "./pages/home";
import store from "./store";
import { Provider } from "react-redux";
import NotFound from "./pages/NotFound";
import AuthRoute from "./components/AuthRoute";
import Profile from "./pages/Profile";
import LecturerRoute from "./components/LecturerRoute";
import ViewVideo from "./pages/ViewVideo";
import AdminPage from "./pages/Admin";
import CourseManage from "./pages/CourseManage";
import CreateCourse from "./pages/CreateCourse";
import UpdateCourse from "./pages/UpdateCourse";
import CourseContent from "./pages/CourseContent";
import Detail from "./pages/detail";
import Courses from "./pages/courses";
import { fetchCurrentCourse } from "./store/course/lec";
import SearchPage from "./pages/Search";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRoute from "./components/AdminRoute";
import ResetPassword from "./pages/ResetPassword";
import ViewContent from "./pages/ViewContent";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/detail/:id">
                        <Detail/>
                    </Route>
                    <Route exact path="/resetPassword">
                        <ResetPassword/>
                    </Route>
                    <AuthRoute exact path="/profile">
                        <Profile/>
                    </AuthRoute>
                    <Route exact path={"/course"}>
                        <Courses/>
                    </Route>
                    <Route exact path={"/course/:cid/view"}>
                        <ViewContent/>
                    </Route>
                    <Route exact path={"/course/:cid/view/:vid"}>
                        <ViewVideo/>
                    </Route>
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
                    <Route exact path={"/admin/signin"}>
                        <AdminLoginPage/>
                    </Route>
                    <AdminRoute exact path={"/admin"}>
                        <AdminPage/>
                    </AdminRoute>
                    <Route exact path={"/search"}>
                        <SearchPage/>
                    </Route>
                    <Route path="*">
                        <NotFound/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}

store.subscribe(App);

export default App;
