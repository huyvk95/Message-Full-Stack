import React, { Component } from "react";
import { connect } from "react-redux";
import { initialize, setAppViewType } from "./action/AppActions";
import AuthRouter from "./router/AuthRouter";
import * as api from "./Api";
import ToastContainComponent from "./component/ToastContainComponent";
import PopupContainComponent from "./component/PopupContainComponent";
import DropdownContainComponent from "./component/DropdownContainComponent";
import { IStoreState, IAppData } from "./interface/DataInterface";
import { EViewType } from "./common/TypeCommon";

interface IProps {
    initialize: Function,
    setAppViewType: Function,
    app: IAppData
}

let timeout: NodeJS.Timeout | undefined = undefined
class App extends Component<IProps> {
    constructor(props: IProps) {
        super(props)
        this.state = { update: 0 }
    }

    /* Life circle */
    UNSAFE_componentWillMount() {
        // Api initialize
        api.initialize()
        // App initialize
        this.props.initialize();
        // Set view type
        this.props.setAppViewType(window.innerWidth <= 575.98 ? EViewType.MOBILE : EViewType.WINDOW)
        window.addEventListener('resize', (event) => {
            window.addEventListener('resize', (...a) => {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = undefined;
                }
                timeout = setTimeout(() => {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = undefined;
                    }
                    let type = (event.target as any)?.innerWidth <= 575.98 ? EViewType.MOBILE : EViewType.WINDOW
                    if (this.props.app.viewType !== type) this.props.setAppViewType(type)
                }, 100);
            })
        })
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

const mapDispatchToProps = { initialize, setAppViewType }

export default connect(({ app }: IStoreState) => ({ app }), mapDispatchToProps)(App);