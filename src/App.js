import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.css';
import Home from "./pages/home";
import store from "./store";
import {Provider} from "react-redux";
import NotFound from "./components/NotFound";
import AuthRoute from "./components/AuthRoute";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <AuthRoute exact path="/lecturer">
                        <div>
                            Hello
                        </div>
                    </AuthRoute>
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
