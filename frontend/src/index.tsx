import React, { Suspense } from "react";
import ReactDom from "react-dom";
import App from "./App";
import store from "./Store";
import "./css/bootstrap.min.css"
import "./css/font-awesome.min.css"
import "./css/style.css"
import "./i18n";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { futimesSync } from "fs";

console.log = ()=>{}

const Context = () => (
    <Suspense fallback="loading">
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </Suspense>
)

ReactDom.render(<Context />, document.getElementById('root'))