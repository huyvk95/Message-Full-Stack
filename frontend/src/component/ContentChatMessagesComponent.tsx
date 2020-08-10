import React from "react";
import { IContentChatMessageProps } from "../interface/ComponentInterface";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";

function ContentChatMessagesComponent({ chatroom, navigation }: IContentChatMessageProps) {
    // Get chatroom data
    let chatroomId = navigation.chatroom;
    let chatroomData = chatroom.find(o => o.chatroom._id === chatroomId);
    if (!chatroomData) return (
        <div className="d-flex w-100 h-100 justify-content-center align-items-center text-20">
            Let's start your first conversation
        </div>
    )

    return (
        <div className="chat-area" style={{ height: window.innerHeight - 57 - 50 }}>

        </div>
    )
}

export default connect(({ navigation, chatroom }: IStoreState) => ({ navigation, chatroom }))(ContentChatMessagesComponent);