import React, { Component } from "react";
import { connect } from "react-redux";
import { initialize } from "./action/AppActions";
import AuthRouter from "./router/AuthRouter";
import * as api from "./Api";
import ToastContainComponent from "./component/ToastContainComponent";
import PopupContainComponent from "./component/PopupContainComponent";
import DropdownContainComponent from "./component/DropdownContainComponent";

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
                <DropdownContainComponent />
                <PopupContainComponent />
                <ToastContainComponent />
            </>
        )
    }
}

const mapDispatchToProps = { initialize }

export default connect(null, mapDispatchToProps)(App);