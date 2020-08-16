import React, { useState } from 'react';
import * as api from "../api";
import { connect } from 'react-redux';
import { token } from "../action/action.user";
import { IStoreState, IUserData } from '../interface/interface.data';
import MainNavigation from "./navigation.main";
import LoginContainer from '../container/container.login';
import { View } from 'react-native';

const AuthNavigation = ({ user, token }: { user: IUserData, token: Function }) => {
    let [fail, setFail] = useState(false)
    // Check login token
    if (!user.email && api.getHeaders().authorization && api.getHeaders().deviceId && !fail) {
        token().catch(() => setFail(true))
        return (<View></View>)
    }
    // Check login normal
    else {
        return (
            <>
                {
                    user.email ?
                        <MainNavigation />
                        :
                        <LoginContainer />
                }
            </>
        )
    }
}

const mapPropsToState = (state: IStoreState) => ({
    user: state.user
})

const mapDispatchToState = {
    token
}

export default connect(mapPropsToState, mapDispatchToState)(AuthNavigation);