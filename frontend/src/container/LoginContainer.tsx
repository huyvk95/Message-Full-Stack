import React, { Component, ChangeEvent } from "react";

interface IProps {

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
        
    }

    render() {
        return (
            <div>
                <input type="text" value="Email" onChange={this.onChangeEmail} />
                <input type="text" value="Password" onChange={this.onChangePassword} />
                <button onClick={this.onClickLogin}>Login</button>
            </div>
        )
    }
}

export default LoginContainer;