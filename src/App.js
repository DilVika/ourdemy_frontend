import React, {createContext} from 'react';
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

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}

store.subscribe(App)

export default App;
