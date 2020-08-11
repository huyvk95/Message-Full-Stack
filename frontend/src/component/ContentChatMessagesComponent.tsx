import React, { useState } from "react";
import { IContentChatMessageProps } from "../interface/ComponentInterface";
import { connect } from "react-redux";
import { IStoreState, IMessageData, IUserData, IFriendData } from "../interface/DataInterface";
import socket from "../socket";
import common from "../common";
import AvatarComponent from "./AvatarComponent";

let timeout: NodeJS.Timeout | undefined = undefined
function ContentChatMessagesComponent({ chatroom, navigation, message, user }: IContentChatMessageProps) {
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
    let height = window.innerHeight - 57 - 50;
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
        <div className="chat-area" style={{ height: update ? height : height }}>
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
                size="small"
                className={`${!isMine && (isEndChat || isAloneChat) ? "visible" : "invisible"} mr-2`}
            />
            <div className={`message-text text-normal text-15 ${isMidChat ? "chat-mid" : isEndChat ? "chat-end" : isTopChat ? "chat-top" : ""}`}>
                {data.message}
            </div>
        </div>
    )
}

export default connect(({ navigation, chatroom, message, user }: IStoreState) => ({ navigation, chatroom, message, user }))(ContentChatMessagesComponent);