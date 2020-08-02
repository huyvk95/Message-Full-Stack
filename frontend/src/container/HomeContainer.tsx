import React, { Component } from "react";
import { logout } from "../action/UserActions";
import { connect } from "react-redux";
import socket from "../socket";
import { IStoreState, IAppData } from "../interface/DataInterface";

interface IProps {
    app: IAppData,
    logout: Function
}

class HomeContainer extends Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.onClickLogout = this.onClickLogout.bind(this);
    }

    componentWillMount() {
        let { app } = this.props;
        socket.init({ deviceId: app.deviceId });
    }

    onClickLogout() {
        this.props.logout();
    }

    render() {
        return (
            <div>
                <button onClick={this.onClickLogout}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = ({ app }: IStoreState) => ({
    app
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);