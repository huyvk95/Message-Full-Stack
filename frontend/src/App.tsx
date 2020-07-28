import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./Store";
import * as api from "./Api";
import AuthRouter from "./router/AuthRouter";

class App extends Component {
    constructor(props: any) {
        super(props)
    }

    /* Life circle */
    componentWillMount() {
        this.initialize();
    }

    /* Initialize */
    initialize() {
        // API
        api.initialize()
    }

    /* Render */
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <AuthRouter />
                </Router>
            </Provider>
        )
    }
}

export default App;