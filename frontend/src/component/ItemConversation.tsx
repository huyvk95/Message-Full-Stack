import React, { useState } from "react";
import AvatarComponent from "./AvatarComponent";
import util from "../util";
import { IStoreState } from "../interface/DataInterface";
import { connect } from "react-redux";
import { IItemConversationProps } from "../interface/ComponentInterface";
import { openDropdown } from "../action/AppActions";
import { setChatroomNavigation } from "../action/NavigationActions";
import DropdownConversationComponent from "./DropdownConversationComponent";
import socket from "../socket";
import common from "../common";

function ItemConversationComponent({ data, user, friend, navigation, openDropdown, setChatroomNavigation }: IItemConversationProps) {
    // Props
    let { chatroom, friendsChatroom, myChatroom } = data;
    let { lastMessage, name, type, _id: chatroomId } = chatroom;
    // State
    const [hover, setHover] = useState(false);
    // Variable
    // -Get friend data
    let friendsData = friendsChatroom.map(o => friend.find(oo => oo._id === o.user._id))
    // -Check i read message
    let myRead = myChatroom.read || lastMessage && lastMessage.user === user._id
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

    const onClickItem = () => {
        // Send read
        let sc = socket.getSocket();
        if (!myChatroom.read && sc) {
            sc.transmit(common.packet.CHATROOM, {
                evt: common.event.CHATROOM.MASK_AS_READ,
                data: { userChatroomId: myChatroom._id }
            })
        }
        // Set navigation
        setChatroomNavigation(chatroomId)
    }

    return (
        <div
            className={`conversation-item px-2 ${myChatroom.show && myChatroom.active ? "d-block" : "d-none"}`}
            onMouseOver={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            onClick={onClickItem}
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
                            <button
                                onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                                    let rect = ((event.target as any).getBoundingClientRect())
                                    openDropdown(<DropdownConversationComponent chatroom={data} />, { x: rect.left - 10, y: rect.bottom + 5 })
                                }}
                            >
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

export default connect(({ user, friend, navigation }: IStoreState) => ({ user, friend, navigation }), { openDropdown, setChatroomNavigation })(ItemConversationComponent)