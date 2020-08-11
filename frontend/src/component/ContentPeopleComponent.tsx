import React from "react";
import { Button, Badge } from "react-bootstrap";
import { IStoreState } from "../interface/DataInterface";
import { connect } from "react-redux";
import { IContentPeopleProps } from "../interface/ComponentInterface";
import { EPeopleTap } from "../common/TypeCommon";
import { choosePeopleTab } from "../action/NavigationActions";
import ListRequestComponent from "./ListRequestComponent";
import ListPeopleComponent from "./ListPeopleComponent";

function ContentPeopleComponent({ navigation, friend, friendRequest, choosePeopleTab }: IContentPeopleProps) {
    return (
        <div className="content-people">
            <div className="navigation px-3 py-2">
                <Button
                    variant="outline-primary"
                    className={`btn-outline-custom ${navigation.peopleTab === EPeopleTap.PEOPLE? "text-dark":"text-light"}`}
                    onClick={() => { choosePeopleTab(EPeopleTap.PEOPLE) }}
                >
                    {`Friends${friend.length ? ` (${friend.length})` : ""}`}
                </Button>
                <Button
                    variant="outline-primary"
                    className={`btn-outline-custom ${navigation.peopleTab === EPeopleTap.REQUEST? "text-dark":"text-light"}`}
                    onClick={() => { choosePeopleTab(EPeopleTap.REQUEST) }}
                >
                    {`Request${friendRequest.receive.length ? ` (${friendRequest.receive.length})` : ""}`}
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

const mapStateToProps = ({ navigation, friend, friendRequest }: IStoreState) => ({ navigation, friend, friendRequest })
const mapDispatchToProps = { choosePeopleTab }

export default connect(mapStateToProps, mapDispatchToProps)(ContentPeopleComponent)