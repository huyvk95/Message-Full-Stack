import React from "react";
import AvatarComponent from "./AvatarComponent";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IContentChatHeaderProps } from "../interface/ComponentInterface";
import util from "../util";
import { setChatroomNavigation } from "../action/NavigationActions";
import { openPopup } from "../action/AppActions";
import PopupUserInfoComponent from "./PopupUserInfoComponent";

function ContentChatHeaderComponent({ chatroom, navigation, friend, setChatroomNavigation, openPopup }: IContentChatHeaderProps) {
    // Get chatroom data
    let chatroomId = navigation.chatroom;
    let chatroomData = chatroom.find(o => o.chatroom._id === chatroomId);
    if (!chatroomData) return <></>
    let { friendsChatroom } = chatroomData;
    // Get frienddata
    let friendsData = chatroomData.friendsChatroom.map(o => friend.find(oo => oo._id === o.user._id))
    // Chatroom name
    let chatroomName = chatroomData.chatroom.type === 'conversation' ?
        friendsData.length > 0 && friendsData[0]?.nickname ?
            friendsData[0]?.nickname :
            `${friendsChatroom[0]?.user?.lastName} ${friendsChatroom[0]?.user?.firstName}` :
        chatroomData.chatroom.name
    // Active time
    let activeTime = chatroomData.chatroom.type === 'conversation' && friendsChatroom.length > 0 && friendsChatroom[0]?.user?.online ? "Online" :
        friendsChatroom[0]?.user?.lastOnlineTime ? `Active ${util.string.roundTime(Date.now() - new Date(friendsChatroom[0]?.user?.lastOnlineTime).getTime(), true)} ago` : ""
    // Avatar
    let avtUrl = chatroomData.chatroom.type === 'conversation' && friendsChatroom.length > 0 ? friendsChatroom[0]?.user?.avatar : undefined
    // Click handle
    let clickHandle = () => {
        if (chatroomData && chatroomData.chatroom.type === 'conversation' && friendsChatroom.length > 0 && friendsChatroom[0]?.user) {
            openPopup({ body: <PopupUserInfoComponent data={friendsChatroom[0]?.user} form="friend" /> })
        }
    }

    return (
        <div className="info-area px-3 py-2">
            <div className="d-flex">
                <button
                    className="pr-3 d-sm-none"
                    onClick={() => { setChatroomNavigation(undefined) }}
                >
                    <i className="fa fa-chevron-left font-weight-light text-primary" />
                </button>
                <AvatarComponent
                    url={avtUrl}
                    size="normal"
                    onClick={clickHandle}
                />
                <div className="user-info ml-3">
                    <p className="text-bold text-16">{chatroomName}</p>
                    <p className="text-normal text-light text-12">{activeTime}</p>
                </div>
            </div>
            <div className="control d-flex align-items-center">
                {/* <button>
                    <i className="fa fa-info-circle" />
                </button> */}
            </div>
        </div>
    )
}

export default connect(({ navigation, chatroom, friend }: IStoreState) => ({ navigation, chatroom, friend }), { setChatroomNavigation, openPopup })(ContentChatHeaderComponent);