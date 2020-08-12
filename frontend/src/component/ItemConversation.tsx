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
import { EViewType, EConversationType } from "../common/TypeCommon";

function ItemConversationComponent({ data, user, friend, navigation, openDropdown, setChatroomNavigation, app, typing }: IItemConversationProps) {
    // Props
    let { chatroom, friendsChatroom, myChatroom } = data;
    let { lastMessage, name, type, _id: chatroomId } = chatroom;
    // State
    const [hover, setHover] = useState(false);
    // Variable
    // -Get friend data
    let friendsData = friendsChatroom.map(o => friend.find(oo => oo._id === o.user._id))
    // -Check i read message
    let read = myChatroom.read || lastMessage && (lastMessage.user as string) === user._id
    // -Chatroom name
    let chatroomName = chatroom.type === 'conversation' ?
        friendsData.length > 0 && friendsData[0]?.nickname ? friendsData[0]?.nickname : `${friendsChatroom[0]?.user?.lastName} ${friendsChatroom[0]?.user?.firstName}` : name
    // -Active
    let active = navigation.chatroom === chatroom._id
    // -Show typing
    let typingData = typing[chatroom._id]
    let showTyping = typingData && typingData.some(o => o._id !== user._id)
    // -Time display
    let tu = new Date(chatroom.updateTime)
    let tn = new Date()
    let tdisplay = ""
    if (tn.getTime() - tu.getTime() < 1000 * 60 * 60 * 24 && tn.getDate() === tu.getDate()) {
        tdisplay = `${util.string.zeroPad(tu.getHours(), 2)}:${util.string.zeroPad(tu.getMinutes(), 2)}`
    } else {
        tdisplay = `${tu.getDate()} Tháng ${tu.getMonth() + 1}`
    }
    // -Message prefix
    let msgPrefix = lastMessage && lastMessage.user === user._id ? "You: " : ""
    // -Check hide
    let show = (navigation.conversationView === EConversationType.NORMAL && myChatroom.show && !myChatroom.block && !myChatroom.archive && myChatroom.active) ||
        (navigation.conversationView === EConversationType.ARCHIVE && myChatroom.show && myChatroom.archive && myChatroom.active) ||
        (navigation.conversationView === EConversationType.BLOCK && myChatroom.show && myChatroom.block && myChatroom.active)

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
            className={`conversation-item px-2 ${show ? "d-block" : "d-none"}`}
            onMouseOver={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
        >
            <div className={`conversation-background px-2 py-2 ${active ? "active" : ""}`}>
                <div
                    className="left"
                    onClick={onClickItem}
                >
                    <AvatarComponent
                        online={
                            chatroom.type !== "conversation" || friendsChatroom.length !== 1 || !friendsChatroom[0] ? undefined : {
                                status: friendsChatroom[0]?.user?.online,
                                lastOnlineTime: friendsChatroom[0]?.user?.lastOnlineTime,
                            }
                        }
                        url={type === "conversation" && friendsChatroom.length === 1 ? friendsChatroom[0].user.avatar : undefined}
                        size="medium"
                    />
                    <div className="info ml-2">
                        <p className={`text-15 ${read ? "text-bold" : "text-bolder"}`}>{chatroomName}</p>
                        <div className="last-message" style={{ visibility: lastMessage ? "visible" : "hidden" }}>
                            {
                                showTyping ?
                                    <div className="dotsContainer">
                                        <span id="dot1"></span>
                                        <span id="dot2"></span>
                                        <span id="dot3"></span>
                                    </div>
                                    :
                                    <>
                                        <p className="text-bold text-light">{`${msgPrefix}${lastMessage?.message}`}</p>
                                        <p className="text-bold text-light"><span>· </span>{` ${tdisplay}`}</p>
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className="right">
                    {
                        hover ?
                            <button
                                onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                                    let rect = ((event.target as any).getBoundingClientRect())
                                    openDropdown(<DropdownConversationComponent chatroom={data} />, { x: app.viewType === EViewType.WINDOW ? rect.left - 10 : rect.left - 130, y: rect.bottom + 5 })
                                }}
                            >
                                <i className="fa fa-ellipsis-h" />
                            </button>
                            :
                            !read ?
                                <div className="dot" />
                                :
                                lastMessage && (lastMessage.user as string) === user._id ?
                                    <AvatarComponent
                                        url={type === "conversation" && friendsChatroom.length === 1 && friendsChatroom[0].read ? friendsChatroom[0].user.avatar : undefined}
                                        size="tiny"
                                        className={`${friendsChatroom.some(o => o.read) ? "d-inline-flex" : "d-none"}`}
                                    />
                                    :
                                    <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default connect(({ user, friend, navigation, app, typing }: IStoreState) => ({ user, friend, navigation, app, typing }), { openDropdown, setChatroomNavigation })(ItemConversationComponent)