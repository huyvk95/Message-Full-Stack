import React, { Component, ChangeEvent } from "react";
import { login, register } from "../action/UserActions";
import { connect } from "react-redux";
import { Button, Form, ButtonGroup } from "react-bootstrap";
import { ELoginViewType } from "../common/TypeCommon";
import { ILoginContainerProps, ILoginContainerState } from "../interface/ComponentInterface";

class LoginContainer extends Component<ILoginContainerProps, ILoginContainerState> {
    constructor(props: ILoginContainerProps) {
        super(props)

        this.state = {
            viewType: ELoginViewType.SIGNIN,
            email: "huy00000@gmail.com",
            password: "12345678",
            confirmPassword: "12345678",
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeComfirmPassword = this.onChangeComfirmPassword.bind(this);
        this.onClickSetViewType = this.onClickSetViewType.bind(this);
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

    onClickSetViewType(type: ELoginViewType) {
        this.setState({ viewType: type })
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
            <div className="login">
                <div className="content">
                    <div className="icon  mb-2">
                        <i className="fa fa-paper-plane"></i>
                    </div>
                    <h1 className="text-40 mb-4"> Messenger </h1>
                    <h2 className="text-16 mb-3"> Liên hệ ngay với mọi người trong cuộc sống của bạn. </h2>
                    <p className="text-16  mb-4"> Đăng nhập bằng Facebook để bắt đầu. </p>
                    <Form className="input" onSubmit={this.onLoginSubmit}>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="outline-primary" className="btn-left text-17 text-lighter" block onClick={() => { this.onClickSetViewType(ELoginViewType.SIGNIN) }}>Sign in</Button>
                            <Button variant="outline-primary" className="btn-right text-17 text-lighter" block onClick={() => { this.onClickSetViewType(ELoginViewType.SIGNUP) }}>Sign up</Button>
                        </ButtonGroup>
                        <Form.Group controlId="formBasicEmail" className="form-middle">
                            <Form.Control
                                type="email"
                                placeholder="Email hoặc số điện thoại"
                                className="text-17"
                                defaultValue="huy00000@gmail.com"
                                onChange={this.onChangeEmail}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className={`${viewType === ELoginViewType.SIGNIN ? "form-bottom" : "form-middle"}`}>
                            <Form.Control
                                type="password"
                                placeholder="Mật khẩu"
                                className="text-17"
                                defaultValue="12345678"
                                onChange={this.onChangePassword}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className={`${viewType === ELoginViewType.SIGNIN ? "d-none" : ""} form-bottom`}>
                            <Form.Control
                                type="password"
                                placeholder="Xác thực mật khẩu"
                                className="text-17"
                                defaultValue="12345678"
                                onChange={this.onChangeComfirmPassword}
                            />
                        </Form.Group>
                        <Button variant="link" type="submit" className="text-23 text-primary mb-4">
                            Tiếp tục
                        </Button>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Duy trì đăng nhập" />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    login, register
}

export default connect(null, mapDispatchToProps)(LoginContainer);