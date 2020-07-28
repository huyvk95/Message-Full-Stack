import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { IStoreState, IUserData } from "../interface/DataInterface";
import ContainerRouter from "./ContainerRouter";

function AuthRouter({ user }: { user: IUserData }) {
    return (
        <Switch>
            <Route path="/login">
                {
                    user.email ? <Redirect to="/" /> : <ContainerRouter />
                }
            </Route>
            <Route path="/">
                {
                    !user.email ? <Redirect to="/login" /> : <ContainerRouter />
                }
            </Route>
        </Switch>
    )
}

const mapPropsToState = (state: IStoreState) => ({
    user: state.user
})

export default connect(mapPropsToState)(AuthRouter)