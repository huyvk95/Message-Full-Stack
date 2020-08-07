import React from "react";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { chooseContentTab } from "../action/NavigationActions";
import { pushToast } from "../action/AppActions";
import { IFooterComponentProps } from "../interface/ComponentInterface";
import { EContentTap } from "../common/TypeCommon";

function ContentFooterComponent({ navigation, chooseContentTab, pushToast }: IFooterComponentProps) {
    let tab = navigation.contentTab;

    return (
        <div className="content-footer px-3 pt-2">
            <div
                className={`footer-item ${tab === EContentTap.CONVERSATION ? "active" : ""}`}
                onClick={() => { chooseContentTab(EContentTap.CONVERSATION) }}
            >
                <div className="item-content">
                    <i className="fa fa-comment" />
                    <p className="text-bold">Chats</p>
                </div>
            </div>
            <div
                className={`footer-item ${tab === EContentTap.PEOPLE ? "active" : ""}`}
                onClick={() => {
                    pushToast({ content: "Hello", time: new Date() })
                }}
            // onClick={() => { chooseContentTab(EContentTap.PEOPLE) }}
            >
                <div className="item-content">
                    <i className="fa fa-users" />
                    <p className="text-bold">People</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: IStoreState) => ({ navigation: state.navigation })
const mapDispatchToProps = { chooseContentTab, pushToast }

export default connect(mapStateToProps, mapDispatchToProps)(ContentFooterComponent)