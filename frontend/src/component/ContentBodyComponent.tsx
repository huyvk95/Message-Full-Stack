import React, { useState } from "react";
import ContentConversationComponent from "./ContentConversationComponent";
import ContentPeopleComponent from "./ContentPeopleComponent";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IContentBodyProps } from "../interface/ComponentInterface";
import { EContentTap } from "../common/TypeCommon";

let timeout: NodeJS.Timeout | undefined = undefined
function ContentBodyComponent({ navigation }: IContentBodyProps) {
    let [update, setUpdate]: [number, Function] = useState(0);
    // On drag
    window.addEventListener('resize', (...a) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }
        timeout = setTimeout(() => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }
            setUpdate(Math.random())
        }, 100);
    })
    let height = window.innerHeight - 54 - 56;

    return (
        <div className="content-body" style={{ height: update ? height : height }}>
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