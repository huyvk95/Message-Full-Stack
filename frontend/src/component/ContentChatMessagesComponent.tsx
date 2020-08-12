import React, { useState, useEffect } from "react";
import { IContentChatMessageProps } from "../interface/ComponentInterface";
import { connect } from "react-redux";
import { IStoreState, IMessageData, IUserData, IFriendData, INavigatorData } from "../interface/DataInterface";
import socket from "../socket";
import common from "../common";
import AvatarComponent from "./AvatarComponent";
import { Spinner } from "react-bootstrap";

let timeout: NodeJS.Timeout | undefined = undefined
function ContentChatMessagesComponent({ chatroom, navigation, message, user }: IContentChatMessageProps) {
    let [update, setUpdate]: [number, Function] = useState(0);
    let [loading, setLoading]: [boolean, Function] = useState(false);
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
    let height = window.innerHeight - 57 - 50;
    // Check scroll
    useEffect(() => {
        let chatArea = document.getElementById('chat-area');
        if (chatArea) {
            chatArea.addEventListener('scroll', (event) => {
                let topOffset = (event.target as any).scrollTop;
                if (typeof topOffset === 'number' && topOffset === 0 && !loading) {
                    setLoading(true);

                    let sc = socket.getSocket()
                    if (sc) sc.transmit(common.packet.MESSAGE, { evt: common.event.MESSAGE.GET, data: { chatroomId: navigation.chatroom, skip: messageData.length } })
                    setTimeout(() => { setLoading(false); }, 1000)
                }
            });
        }
    })
    // Get chatroom data
    let chatroomId = navigation.chatroom;
    let chatroomData = chatroom.find(o => o.chatroom._id === chatroomId);
    if (!chatroomData) return (
        <div className="d-flex w-100 h-100 justify-content-center align-items-center text-20">
            Let's start your first conversation
        </div>
    )

    // Get message list
    let messageData: IMessageData[] = [];
    if (chatroomId && message[chatroomId]) {
        messageData = message[chatroomId]
    }
    else {
        let sc = socket.getSocket()
        if (sc) sc.transmit(common.packet.MESSAGE, { evt: common.event.MESSAGE.GET, data: { chatroomId } })
    }

    return (
        <div className="chat-area" id="chat-area" style={{ height: update ? height : height }}>
            <ItemChatTypingComponent
            />
            {
                messageData.map((o, i) => (
                    <ItemChatMessagesComponent
                        data={o}
                        preData={messageData[i - 1]}
                        nextData={messageData[i + 1]}
                        user={user}
                        key={i}
                    />
                ))
            }
            <div className={`justify-content-center py-2 ${loading ? "d-flex" : "d-none"}`}>
                <Spinner animation="border" />
            </div>
        </div>
    )

}

function ItemChatMessagesComponent({ data, preData, nextData, user }: { data: IMessageData, preData?: IMessageData, nextData?: IMessageData, user: IUserData }) {
    let isMine = (data.user as IFriendData)._id === user._id;
    let isMidChat = (nextData?.user as IFriendData)?._id === (data.user as IFriendData)._id && (preData?.user as IFriendData)?._id === (data.user as IFriendData)._id;
    let isEndChat = (nextData?.user as IFriendData)?._id === (data.user as IFriendData)._id && (preData?.user as IFriendData)?._id !== (data.user as IFriendData)._id;
    let isTopChat = (nextData?.user as IFriendData)?._id !== (data.user as IFriendData)._id && (preData?.user as IFriendData)?._id === (data.user as IFriendData)._id;
    let isAloneChat = (nextData?.user as IFriendData)?._id !== (data.user as IFriendData)._id && (preData?.user as IFriendData)?._id !== (data.user as IFriendData)._id;

    return (
        <div className={`
            item-chat-message 
            px-3 
            ${isMine ? "mine" : "friend"} 
            ${isEndChat || isAloneChat ? "mb-3" : ""}
            `}
        >
            <AvatarComponent
                url={(data.user as IFriendData).avatar}
                size="small"
                className={`${!isMine && (isEndChat || isAloneChat) ? "visible" : "invisible"} mr-2`}
            />
            <div className={`message-text text-normal text-15 ${isMidChat ? "chat-mid" : isEndChat ? "chat-end" : isTopChat ? "chat-top" : ""}`}>
                {data.message}
            </div>
        </div>
    )
}


const ItemChatTypingComponent = connect(({ typing, navigation, user }: IStoreState) => ({ typing, navigation, user }))
    (function ({ typing, navigation, user }: { typing: { [key in string]: IFriendData[] }, navigation: INavigatorData, user: IUserData }) {
        let chatroomId = navigation.chatroom;
        let typingData = chatroomId ? typing[chatroomId] : undefined
        let show = typingData && typingData.some(o => o._id !== user._id)
        let avtUrl = typingData && typingData.find(o => o._id !== user._id)?.avatar;
        return (
            <div className={`item-chat-message px-3 friend mb-3 ${show ? "d-flex" : "d-none"}`}
            >
                <AvatarComponent
                    url={avtUrl}
                    size="small"
                    className={`visible mr-2`}
                />
                <div>
                    <div className="dotsContainer">
                        <span id="dot1"></span>
                        <span id="dot2"></span>
                        <span id="dot3"></span>
                    </div>
                </div>
            </div>
        )
    })

export default connect(({ navigation, chatroom, message, user }: IStoreState) => ({ navigation, chatroom, message, user }))(ContentChatMessagesComponent);