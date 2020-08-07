import React, { Component } from "react";
import { connect } from "react-redux";
import { initialize } from "./action/AppActions";
import AuthRouter from "./router/AuthRouter";
import ToastContainComponent from "./component/ToastContainComponent";
import PopupContainComponent from "./component/PopupContainComponent";
import * as api from "./Api";

interface IProps {
    initialize: Function
}

class App extends Component<IProps> {
    /* Life circle */
    UNSAFE_componentWillMount() {
        // Api initialize
        api.initialize()
        // App initialize
        this.props.initialize();
    }

    /* Render */
    render() {
        return (
            <>
                <AuthRouter />
                <ToastContainComponent />
                <PopupContainComponent />
            </>
        )
    }
}

const mapDispatchToProps = { initialize }

export default connect(null, mapDispatchToProps)(App);