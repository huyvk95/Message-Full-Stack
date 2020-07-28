import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import HomeContainer from "../container/HomeContainer";
import LoginContainer from "../container/LoginContainer";
import { IStoreState, IUserData } from "../interface/DataInterface";

function ContainerRouter({ user }: { user: IUserData }) {
    return (
        <Switch>
            <Route path="/login">
                <LoginContainer />
            </Route>
            <Route path="/" exact>
                <HomeContainer />
            </Route>
        </Switch>
    )
}

const mapPropsToState = (state: IStoreState) => ({
    user: state.user
})

export default connect(mapPropsToState)(ContainerRouter)