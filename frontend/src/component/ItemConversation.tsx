import React, { useState } from "react";
import AvatarComponent from "./AvatarComponent";
import { IStoreState } from "../interface/DataInterface";
import util from "../util";
import { connect } from "react-redux";
import { IItemConversationProps } from "../interface/ComponentInterface";

function ItemConversationComponent({ data, user, friend, navigation }: IItemConversationProps) {
    // Props
    let { chatroom, friendsChatroom, myChatroom } = data;
    let { lastMessage, name, type } = chatroom;
    // State
    const [hover, setHover] = useState(false);
    // Variable
    // -Get friend data
    let friendsData = friendsChatroom.map(o => friend.find(oo => oo._id === o.user._id))
    // -Check i read message
    let myRead = lastMessage && lastMessage.user !== user._id && myChatroom.read
    // -Chatroom name
    let chatroomName = chatroom.type === 'conversation' ?
        friendsData.length > 0 && friendsData[0]?.nickname ? friendsData[0]?.nickname : `${friendsData[0]?.lastName} ${friendsData[0]?.firstName}` : name
    // -Active
    let active = navigation.chatroom === chatroom._id
    // -Time display
    let updateTime = "2020-08-03T23:03:29.777Z"
    let tu = new Date(updateTime)
    let tn = new Date()
    let tdisplay = ""
    if (tn.getTime() - tu.getDate() < 1000 * 60 * 60 * 24 && tn.getDate() === tu.getDate()) {
        tdisplay = `${util.string.zeroPad(tu.getHours(), 2)}:${util.string.zeroPad(tu.getMinutes(), 2)}`
    } else {
        tdisplay = `${tu.getDate()} Tháng ${tu.getMonth() + 1}`
    }

    return (
        <div
            className="conversation-item px-2"
            onMouseOver={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
        >
            <div className={`conversation-background px-2 py-2 ${active ? "active" : ""}`}>
                <div className="left">
                    <AvatarComponent
                        url={type === "conversation" && friendsChatroom.length === 1 ? friendsChatroom[0].user.avatar : undefined}
                        size="medium"
                    />
                    <div className="info ml-2">
                        <p className={`text-15 ${myRead ? "text-bold" : "text-bolder"}`}>{chatroomName}</p>
                        <div className="last-message" style={{ visibility: lastMessage ? "visible" : "hidden" }}>
                            <p className="text-bold text-light">{`Bạn: ${lastMessage?.message}`}</p>
                            <p className="text-bold text-light"><span>· </span>{` ${tdisplay}`}</p>
                        </div>
                    </div>
                </div>
                <div className="right">
                    {
                        hover ?
                            <button>
                                <i className="fa fa-ellipsis-h" />
                            </button>
                            :
                            myRead ?
                                <AvatarComponent
                                    url={type === "conversation" && friendsChatroom.length === 1 && friendsChatroom[0].read ? friendsChatroom[0].user.avatar : undefined}
                                    size="tiny"
                                    className={`${friendsChatroom.some(o => o.read) ? "d-inline-flex" : "d-none"}`}
                                />
                                :
                                <div className="dot" />
                    }
                </div>
            </div>
        </div>
    )
}

export default connect(({ user, friend, navigation }: IStoreState) => ({ user, friend, navigation }))(ItemConversationComponent)