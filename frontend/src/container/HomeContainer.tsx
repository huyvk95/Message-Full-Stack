import React, { Component } from "react";
import { logout } from "../action/UserActions";
import { connect } from "react-redux";

interface IProps {
    logout: Function
}

class HomeContainer extends Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.onClickLogout = this.onClickLogout.bind(this);
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

const mapDispatchToProps = {
    logout
}

export default connect(null, mapDispatchToProps)(HomeContainer);