import React, { Component } from "react";
import { connect } from "react-redux";
import { IStoreState, IUserData } from "../interface/DataInterface";
import { verify } from "../action/UserActions";
import * as api from "../Api";

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

    async componentWillMount() {
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
            <div>
                {
                    verifying ?
                        <></>
                        :
                        <>
                            {
                                !user.emailVerify.verified ?
                                    <div>
                                        <p>Your account hasn't been verify</p>
                                        <a onClick={this.onClickResend}>Resend</a>
                                    </div> :
                                    <div>
                                        <p>Your account has verified</p>
                                    </div>
                            }
                        </>
                }
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