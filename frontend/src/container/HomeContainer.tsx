import React, { Component } from "react";
import { logout } from "../action/UserActions";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IHomeContainerProps } from "../interface/ComponentInterface";
import socket from "../socket";
import AvatarComponent from "../component/AvatarComponent";

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
                    <div className="content-header">
                        <AvatarComponent
                            url="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/p120x120/80445897_1241804469363361_3410662782775853056_n.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=YWfOlvmj-fYAX980NL6&_nc_ht=scontent.fhan3-3.fna&_nc_tp=6&oh=6af6992ff4dbd6280429cab0c5057b9f&oe=5F50F074"
                            type="normal"
                        />
                        <h1 className="text-30">
                            Chat
                        </h1>
                    </div>
                    <div className="content-body">

                    </div>
                </div>
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