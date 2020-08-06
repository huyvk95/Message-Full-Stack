import React from "react";
import ContentConversationComponent from "./ContentConversationComponent";
import ContentPeopleComponent from "./ContentPeopleComponent";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IContentBodyProps } from "../interface/ComponentInterface";
import { EContentTap } from "../common/TypeCommon";

function ContentBodyComponent({ navigation }: IContentBodyProps) {
    return (
        <div className="content-body" style={{ height: window.innerHeight - 54 - 56 }}>
            {
                navigation.contentTab === EContentTap.CONVERSATION ?
                    <ContentConversationComponent /> :
                    navigation.contentTab === EContentTap.PEOPLE ?
                        <ContentPeopleComponent /> :
                        <></>
            }
        </div>
    )
}

const mapStateToProps = (state: IStoreState) => ({ navigation: state.navigation })

export default connect(mapStateToProps)(ContentBodyComponent)