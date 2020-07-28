import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { IStoreState, IUserData } from "../interface/DataInterface";
import HomeContainer from "../container/HomeContainer";
import LoginContainer from "../container/LoginContainer";
import UserContainer from "../container/UserContainer";

function ContainerRouter({ user }: { user: IUserData }) {
    return (
        <Switch>
            <Route path="/login">
                <LoginContainer />
            </Route>
            <Route path="/" exact>
                <HomeContainer />
            </Route>
            <Route path="/user">
                <UserContainer />
            </Route>
        </Switch>
    )
}

const mapPropsToState = (state: IStoreState) => ({
    user: state.user
})

export default connect(mapPropsToState)(ContainerRouter)