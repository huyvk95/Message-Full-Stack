import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { IStoreState, IUserData } from "../interface/DataInterface";
import { token } from "../action/UserActions";
import ContainerRouter from "./ContainerRouter";
import * as api from "../Api";

function AuthRouter({ user, token }: { user: IUserData, token: Function }) {
    let [fail, setFail] = useState(false)
    // Check login token
    if (!user.email && api.getHeaders().authorization && api.getHeaders().deviceId && !fail) {
        token().catch(()=>setFail(true))
        return (<div></div>)
    }
    // Check login normal
    else {
        return (
            <Switch>
                <Route path="/login">
                    {
                        user.email ? <Redirect to="/" /> : <ContainerRouter />
                    }
                </Route>
                <Route path="/verify">
                    {
                        !user.email ? <Redirect to="/login" /> : <ContainerRouter />
                    }
                </Route>
                <Route path="/">
                    {
                        !user.email ? <Redirect to="/login" /> : !user.emailVerify.verified ? <Redirect to="/verify" /> : <ContainerRouter />
                    }
                </Route>
            </Switch>
        )
    }
}

const mapPropsToState = (state: IStoreState) => ({
    user: state.user
})

const mapDispatchToState = {
    token
}

export default connect(mapPropsToState, mapDispatchToState)(AuthRouter)