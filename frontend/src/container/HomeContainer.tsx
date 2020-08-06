import React, { Component } from "react";
import { logout } from "../action/UserActions";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IHomeContainerProps } from "../interface/ComponentInterface";
import socket from "../socket";
import AvatarComponent from "../component/AvatarComponent";
import ContentChatComponent from "../component/ContentChatComponent";
import ContentHeaderComponent from "../component/ContentHeaderComponent";
import ContentFooterComponent from "../component/ContentFooterComponent";
import ContentBodyComponent from "../component/ContentBodyComponent";

class HomeContainer extends Component<IHomeContainerProps> {
    constructor(props: IHomeContainerProps) {
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
            <div className="home">
                <div className="content">
                    <ContentHeaderComponent/>
                    <ContentBodyComponent/>
                    <ContentFooterComponent/>
                </div>
                <ContentChatComponent/>
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