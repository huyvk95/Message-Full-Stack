import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { initialize } from "./action/AppActions";
import { IStoreState, IAppData } from "./interface/DataInterface";
import AuthRouter from "./router/AuthRouter";
import * as api from "./Api";

interface IProps {
    initialize: Function
}

class App extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    /* Life circle */
    componentWillMount() {
        // Api initialize
        api.initialize()
        // App initialize
        this.props.initialize();
    }

    /* Render */
    render() {
        return (
            <Router><AuthRouter /></Router>
        )
    }
}

const mapDispatchToProps = { initialize }

export default connect(null, mapDispatchToProps)(App);