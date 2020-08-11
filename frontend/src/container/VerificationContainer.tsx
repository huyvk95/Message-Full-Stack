import React, { Component } from "react";
import { connect } from "react-redux";
import { IStoreState, IUserData } from "../interface/DataInterface";
import { verify } from "../action/UserActions";
import * as api from "../Api";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IProps {
    user: IUserData
    verify: Function
}

interface IState {
    verifying: boolean,
}

class VerificationContainer extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            verifying: false,
        }

        this.onClickResend = this.onClickResend.bind(this)
    }

    async UNSAFE_componentWillMount() {
        // Check uuid on params for verify
        let uuid = document.location.pathname.split('/').filter(o => o)[1]
        if (uuid) {
            this.setState({ verifying: true })
            await this.props.verify(uuid);
            this.setState({ verifying: false })
        }
    }

    async onClickResend() {
        await api.resendVerify()
    }

    render() {
        let { user } = this.props;
        let { verifying } = this.state;

        return (
            <div className="verify">
                <div className="verify-content">
                    {
                        verifying ?
                            <></>
                            :
                            <>
                                {
                                    !user.emailVerify.verified ?
                                        <>
                                            <i className="fa fa-times-circle d-block text-center text-danger" style={{ fontSize: "120px" }} />
                                            <p className="text-30 text-normal mb-3">Your account hasn't been verify</p>
                                            <Button
                                                className="text-16 text-normal"
                                                block
                                                onClick={this.onClickResend}
                                            >
                                                Resend
                                            </Button>
                                        </> :
                                        <>
                                            <i className="fa fa-check-circle d-block text-center text-success" style={{ fontSize: "120px" }} />
                                            <p className="text-30 text-normal mb-3">Your account has verified</p>
                                            <Link to="/" className="d-block text-16 text-normal text-center">
                                                Go to home page
                                            </Link>
                                        </>
                                }
                            </>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IStoreState) => ({
    user: state.user
})

const mapDispatchToProps = {
    verify
}

export default connect(mapStateToProps, mapDispatchToProps)(VerificationContainer);