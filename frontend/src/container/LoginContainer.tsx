import React, { Component, ChangeEvent } from "react";
import { login } from "../action/UserActions";
import { connect } from "react-redux";

interface IProps {
    login: Function
}

interface IState {
    email: string,
    password: string,
}

class LoginContainer extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            email: "",
            password: "",
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
    }

    onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            email: event.target.value
        })
    }

    onChangePassword(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: event.target.value
        })
    }

    onClickLogin() {
        let { email, password } = this.state;
        this.props.login(email, password)
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Email" onChange={this.onChangeEmail} />
                <input type="password" placeholder="Password" onChange={this.onChangePassword} />
                <button onClick={this.onClickLogin}>Login</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(LoginContainer);