import React from "react";
import { Button } from "react-bootstrap";
import { IStoreState } from "../interface/DataInterface";
import { connect } from "react-redux";
import { IContentPeopleProps } from "../interface/ComponentInterface";
import { EPeopleTap } from "../common/TypeCommon";
import { choosePeopleTab } from "../action/NavigationActions";
import ListRequestComponent from "./ListRequestComponent";
import ListPeopleComponent from "./ListPeopleComponent";

function ContentPeopleComponent({ navigation, choosePeopleTab }: IContentPeopleProps) {
    return (
        <div className="content-people">
            <div className="navigation px-3 py-2">
                <Button
                    variant="outline-primary"
                    className="btn-outline-custom"
                    onClick={() => { choosePeopleTab(EPeopleTap.PEOPLE) }}
                >
                    Friends
                </Button>
                <Button
                    variant="outline-success"
                    className="btn-outline-custom"
                    onClick={() => { choosePeopleTab(EPeopleTap.REQUEST) }}
                >
                    Request
                </Button>
            </div>
            {
                navigation.peopleTab === EPeopleTap.PEOPLE ?
                    <ListPeopleComponent /> :
                    navigation.peopleTab === EPeopleTap.REQUEST ?
                        <ListRequestComponent /> :
                        <></>
            }
        </div>
    )
}

const mapStateToProps = (state: IStoreState) => ({ navigation: state.navigation })
const mapDispatchToProps = { choosePeopleTab }

export default connect(mapStateToProps, mapDispatchToProps)(ContentPeopleComponent)