import React from "react";
import AvatarComponent from "./AvatarComponent";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IContentChatHeaderProps } from "../interface/ComponentInterface";
import util from "../util";

function ContentChatHeaderComponent({ chatroom, navigation, friend }: IContentChatHeaderProps) {
    // Get chatroom data
    let chatroomId = navigation.chatroom;
    let chatroomData = chatroom.find(o => o.chatroom._id === chatroomId);
    if (!chatroomData) return <></>
    // Get frienddata
    let friendsData = chatroomData.friendsChatroom.map(o => friend.find(oo => oo._id === o.user._id))
    // Chatroom name
    let chatroomName = chatroomData.chatroom.type === 'conversation' ?
        friendsData.length > 0 && friendsData[0]?.nickname ? friendsData[0]?.nickname : `${friendsData[0]?.lastName} ${friendsData[0]?.firstName}` : chatroomData.chatroom.name
    // Active time
    let activeTime = chatroomData.chatroom.type === 'conversation' && friendsData.length > 0 && friendsData[0]?.lastOnlineTime ?
        util.string.roundTime(Date.now() - new Date(friendsData[0]?.lastOnlineTime).getTime(), true) : ""

    return (
        <div className="info-area px-3 py-2">
            <div className="d-flex">
                <AvatarComponent size="normal" />
                <div className="user-info ml-3">
                    <p className="text-bold text-16">{chatroomName}</p>
                    <p className="text-normal text-light text-12">{`Active ${activeTime} ago`}</p>
                </div>
            </div>
            <div className="control d-flex align-items-center">
                <button>
                    <i className="fa fa-info-circle" />
                </button>
            </div>
        </div>
    )
}

export default connect(({ navigation, chatroom, friend }: IStoreState) => ({ navigation, chatroom, friend }))(ContentChatHeaderComponent);