import React, { Component } from "react";
import { connect } from "react-redux";
import * as api from "../Api";

interface IState {
    user: any
}

class UserContainer extends Component<null, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            user: {}
        }
    }

    async componentWillMount() {
        let data = await api.getUser();
        this.setState({
            user: data
        })
    }

    render() {
        console.log('User container:', this.state.user)

        return (
            <div>
                User container
            </div>
        )
    }
}

export default connect(null, null)(UserContainer);