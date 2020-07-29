import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import store from "./Store";
import { Provider } from "react-redux";

const Context = ()=>(
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDom.render(<Context />, document.getElementById('root'))