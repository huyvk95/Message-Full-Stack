import React from "react";
import { View } from "react-native";
import style from "../style";
import MessageHeader from "../component/component.message.header";
import MessageControl from "../component/component.message.control";
import MessageContent from "../component/component.message.content";

const MessageContainer = () => {
    return (
        <View style={style.message.message.wrap}>
            <MessageHeader />
            <MessageContent />
            <MessageControl />
        </View>
    )
}

export default MessageContainer;