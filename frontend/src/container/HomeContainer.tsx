import React, { Component } from "react";
import { logout } from "../action/UserActions";
import { connect } from "react-redux";
import * as api from "../Api";

interface IProps {
    logout: Function
}

class HomeContainer extends Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.onClickLogout = this.onClickLogout.bind(this);
        this.onClickGetUser = this.onClickGetUser.bind(this);
    }

    onClickLogout() {
        this.props.logout();
    }

    onClickGetUser() {
        api.getUser().then(data => { console.log(data) });
    }

    render() {
        return (
            <div>
                <button onClick={this.onClickLogout}>Logout</button>
                <button onClick={this.onClickGetUser}>Get user</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    logout
}

export default connect(null, mapDispatchToProps)(HomeContainer);