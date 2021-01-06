import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import Home from "./pages/home";
import store from "./store";
import {Provider} from "react-redux";
import NotFound from "./pages/NotFound";
import AuthRoute from "./components/AuthRoute";
import Profile from "./pages/Profile";
import LecturerRoute from "./components/LecturerRoute";
import ViewVideo from "./pages/ViewVideo";
import AdminPage from "./pages/Admin";

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
                        <div>
                            Lec manage courses
                        </div>
                    </LecturerRoute>
                    <Route exact path={"/course/view"}>
                        <ViewVideo/>
                    </Route>
                    <Route exact path={"/course/view/:vid"}>
                        <ViewVideo/>
                    </Route>
                    <Route exact path={"/admin"}>
                        <AdminPage/>
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
