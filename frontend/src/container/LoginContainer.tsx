import React, { Component, ChangeEvent, RefObject } from "react";
import { login, register } from "../action/UserActions";
import { connect } from "react-redux";
import { Button, Form, ButtonGroup, Tooltip, Overlay } from "react-bootstrap";
import { ELoginViewType } from "../common/TypeCommon";
import { ILoginContainerProps, ILoginContainerState } from "../interface/ComponentInterface";
import util from "../util";

class LoginContainer extends Component<ILoginContainerProps, ILoginContainerState> {
    emailRef: RefObject<HTMLInputElement> | undefined;
    passwordRef: RefObject<HTMLInputElement> | undefined;
    confirmpasswordRef: RefObject<HTMLInputElement> | undefined;
    firstNameRef: RefObject<HTMLInputElement> | undefined;
    lastNameRef: RefObject<HTMLInputElement> | undefined;

    constructor(props: ILoginContainerProps) {
        super(props)

        this.state = {
            viewType: ELoginViewType.SIGNIN,
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            isEmailFail: "",
            isPasswordFail: "",
            isConfirmPasswordFail: "",
            isFirstNameFail: "",
            isLastNameFail: "",
        }
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confirmpasswordRef = React.createRef();
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeComfirmPassword = this.onChangeComfirmPassword.bind(this);
        this.onBlurEmail = this.onBlurEmail.bind(this);
        this.onBlurPassword = this.onBlurPassword.bind(this);
        this.onBlurConfirmPassword = this.onBlurConfirmPassword.bind(this);
        this.onBlurFirstName = this.onBlurFirstName.bind(this);
        this.onBlurLastName = this.onBlurLastName.bind(this);
        this.onClickSetViewType = this.onClickSetViewType.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            email: event.target.value
        })
    }

    onChangeFirstName(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            firstName: event.target.value
        })
    }

    onChangeLastName(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            lastName: event.target.value
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

    onBlurEmail(event: ChangeEvent<HTMLInputElement>) {
        let check = util.common.validateEmail(event.target.value)
        this.setState({
            isEmailFail: check ? "" : "Invalid email format"
        })
    }

    onBlurPassword(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let check = value.length >= 8 || value.length <= 32
        this.setState({
            isPasswordFail: check ? "" : "Password length must be 8 character or more"
        })
    }

    onBlurConfirmPassword(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let check = value.length >= 8 || value.length <= 32
        this.setState({
            isConfirmPasswordFail: check ? "" : "Confirm password length must be 8 character or more"
        })
    }

    onBlurFirstName(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let check = value.length ? true : false
        this.setState({
            isFirstNameFail: check ? "" : "First name required"
        })
    }

    onBlurLastName(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        let check = value.length ? true : false
        this.setState({
            isLastNameFail: check ? "" : "Last name required"
        })
    }

    onClickSetViewType(type: ELoginViewType) {
        this.setState({
            viewType: type,
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            isEmailFail: "",
            isPasswordFail: "",
            isConfirmPasswordFail: "",
            isFirstNameFail: "",
            isLastNameFail: "",
        })
    }

    onLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
        let { email, password, confirmPassword, firstName, lastName, viewType } = this.state;
        // Prevent
        event.preventDefault();

        // Check password
        if (password.length < 8 || password.length > 32) {
            this.setState({ isPasswordFail: "Password length must be 8 character or more" })
            return
        } else if (viewType === ELoginViewType.SIGNUP && password !== confirmPassword) {
            this.setState({ isConfirmPasswordFail: "Password confirmation doesn't match password" })
            return
        }

        // Handle
        if (viewType === ELoginViewType.SIGNIN) {
            this.props.login(email, password)
        } else if (viewType === ELoginViewType.SIGNUP) {
            this.props.register({ email, password, confirmPassword, firstName, lastName })
        }
    }

    render() {
        let { viewType, email, firstName, lastName, password, confirmPassword, isEmailFail, isConfirmPasswordFail, isFirstNameFail, isLastNameFail, isPasswordFail } = this.state;

        return (
            <div className="login">
                <div className="content">
                    <div className="icon  mb-2">
                        <i className="fa fa-paper-plane"></i>
                    </div>
                    <h1 className="text-40 mb-4"> Messenger </h1>
                    <h2 className="text-16 mb-3 text-normal"> Instantly connect with people in your life </h2>
                    <p className="text-16  mb-4 text-normal"> Sign in to get started. </p>
                    <Form className="input" onSubmit={this.onLoginSubmit}>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="outline-primary" className={`btn-left text-17 ${viewType === ELoginViewType.SIGNIN ? "text-bolder" : "text-normal"}`} block onClick={() => { this.onClickSetViewType(ELoginViewType.SIGNIN) }}>Sign in</Button>
                            <Button variant="outline-primary" className={`btn-right text-17 ${viewType === ELoginViewType.SIGNUP ? "text-bolder" : "text-normal"}`} block onClick={() => { this.onClickSetViewType(ELoginViewType.SIGNUP) }}>Sign up</Button>
                        </ButtonGroup>
                        <Form.Group controlId="formBasicEmail" className="form-middle">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                className={`text-17 ${isEmailFail ? "invalid" : ""}`}
                                value={email}
                                ref={this.emailRef}
                                onChange={this.onChangeEmail}
                                onBlur={this.onBlurEmail}
                            />
                            <Overlay target={this.emailRef as RefObject<HTMLInputElement>} show={isEmailFail ? true : false} placement="right">
                                <Tooltip id="email-tool-tip">
                                    {isEmailFail}
                                </Tooltip>
                            </Overlay>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className={`${viewType === ELoginViewType.SIGNIN ? "d-none" : ""} form-middle`}>
                            <Form.Control
                                type="text"
                                placeholder="First name"
                                className={`text-17 form-left ${isFirstNameFail ? "invalid" : ""}`}
                                value={firstName}
                                ref={this.firstNameRef}
                                onChange={this.onChangeFirstName}
                                onBlur={this.onBlurFirstName}
                            />
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                className={`text-17 form-right ${isLastNameFail ? "invalid" : ""}`}
                                value={lastName}
                                ref={this.lastNameRef}
                                onChange={this.onChangeLastName}
                                onBlur={this.onBlurLastName}
                            />
                            <Overlay target={this.lastNameRef as RefObject<HTMLInputElement>} show={isLastNameFail || isFirstNameFail ? true : false} placement="right">
                                <Tooltip id="ln-tool-tip">
                                    {isFirstNameFail ? isFirstNameFail : isLastNameFail ? isLastNameFail : ""}
                                </Tooltip>
                            </Overlay>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className={`${viewType === ELoginViewType.SIGNIN ? "form-bottom" : "form-middle"}`}>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                className={`text-17`}
                                value={password}
                                ref={this.passwordRef}
                                onChange={this.onChangePassword}
                                onBlur={this.onBlurPassword}
                            />
                            <Overlay target={this.passwordRef as RefObject<HTMLInputElement>} show={isPasswordFail ? true : false} placement="right">
                                <Tooltip id="pw-tool-tip">
                                    {isPasswordFail}
                                </Tooltip>
                            </Overlay>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className={`${viewType === ELoginViewType.SIGNIN ? "d-none" : ""} form-bottom`}>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                className={`text-17`}
                                value={confirmPassword}
                                ref={this.confirmpasswordRef}
                                onChange={this.onChangeComfirmPassword}
                                onBlur={this.onBlurConfirmPassword}
                            />
                            <Overlay target={this.confirmpasswordRef as RefObject<HTMLInputElement>} show={isConfirmPasswordFail ? true : false} placement="right">
                                <Tooltip id="cfpw-tool-tip">
                                    {isConfirmPasswordFail}
                                </Tooltip>
                            </Overlay>
                        </Form.Group>
                        <Button variant="link" type="submit" className="text-23 text-primary mb-4">
                            Continue
                        </Button>
                        {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Duy trì đăng nhập" />
                        </Form.Group> */}
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