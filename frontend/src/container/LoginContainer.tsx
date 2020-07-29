import React, { Component, ChangeEvent } from "react";
import { login, register } from "../action/UserActions";
import { connect } from "react-redux";

enum ELoginViewType {
    SIGNIN = 'SIGNIN',
    SIGNUP = 'SIGNUP'
}

interface IProps {
    login: Function
    register: Function
}

interface IState {
    viewType: ELoginViewType
    email: string,
    password: string,
    confirmPassword: string,
}

class LoginContainer extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            viewType: ELoginViewType.SIGNIN,
            email: "",
            password: "",
            confirmPassword: "",
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeComfirmPassword = this.onChangeComfirmPassword.bind(this);
        this.onClickSwitch = this.onClickSwitch.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
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

    onChangeComfirmPassword(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    onClickSwitch() {
        let { viewType } = this.state;
        this.setState({ viewType: viewType == ELoginViewType.SIGNIN ? ELoginViewType.SIGNUP : ELoginViewType.SIGNIN })
    }

    onClickLogin() {
        let { email, password } = this.state;
        this.props.login(email, password)
    }

    onLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
        let { email, password, confirmPassword, viewType } = this.state;
        event.preventDefault();
        if (viewType == ELoginViewType.SIGNIN) {
            this.props.login(email, password)
        } else if (viewType == ELoginViewType.SIGNUP) {
            this.props.register(email, password, confirmPassword)
        }
    }

    render() {
        let { viewType } = this.state;

        return (
            <div>
                <button onClick={this.onClickSwitch}>Switch</button>
                <form onSubmit={this.onLoginSubmit}>
                    <input type="text" placeholder="Email" onChange={this.onChangeEmail} />
                    <input type="password" placeholder="Password" onChange={this.onChangePassword} />
                    {
                        viewType == ELoginViewType.SIGNIN ? <></> : <input type="password" placeholder="Confirm password" onChange={this.onChangeComfirmPassword} />
                    }
                    <button type="submit" onClick={this.onClickLogin}>{viewType == ELoginViewType.SIGNIN ? "Signin" : "Signup"}</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    login, register
}

export default connect(null, mapDispatchToProps)(LoginContainer);