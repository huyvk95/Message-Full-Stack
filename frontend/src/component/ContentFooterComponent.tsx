import React from "react";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { chooseContentTab, choosePeopleTab } from "../action/NavigationActions";
import { IFooterComponentProps, IPopupProps } from "../interface/ComponentInterface";
import { EContentTap, EPeopleTap } from "../common/TypeCommon";
import { pushToast } from "../action/AppActions";
import { ToastFriendRequestComponent, ToastFriendAcceptComponent } from "./ToastsComponent";

function ContentFooterComponent({ navigation, chooseContentTab, pushToast, choosePeopleTab, friendRequest, friend }: IFooterComponentProps) {
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
                onClick={() => { chooseContentTab(EContentTap.PEOPLE) }}
            >
                <div className="item-content">
                    <i className="fa fa-users" />
                    <p className="text-bold">People</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ navigation, friendRequest, friend }: IStoreState) => ({ navigation, friendRequest, friend })
const mapDispatchToProps = { chooseContentTab, pushToast, choosePeopleTab }

export default connect(mapStateToProps, mapDispatchToProps)(ContentFooterComponent)