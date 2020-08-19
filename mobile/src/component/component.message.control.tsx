import React, { useState } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import style from "../style";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import baseStyle from "../style/base";
import { IMessageControl } from "../interface/interface.component";
import { connect } from "react-redux";
import { IStoreState } from "../interface/interface.data";
import socket from "../socket";
import common from "../common";

const MessageControl = ({ chatroomId, chatroom }: IMessageControl) => {
    let [onTyping, setOnTyping] = useState(false);
    let [text, setText] = useState("");
    // Get chatroom data
    let chatroomData = chatroom.find(o => o.chatroom._id === chatroomId);
    if (!chatroomData) return <></>

    const sendTyping = (typing: boolean) => {
        let sc = socket.getSocket();
        if (sc) sc.transmit(common.packet.CHATROOM, {
            evt: common.event.CHATROOM.SEND_TYPING,
            data: {
                typing,
                chatroomId: chatroomId
            }
        })
    }

    const sendRead = () => {
        if (chatroomData && !chatroomData?.myChatroom.read) {
            let sc = socket.getSocket();
            if (sc) {
                sc.transmit(common.packet.CHATROOM, {
                    evt: common.event.CHATROOM.MASK_AS_READ,
                    data: { userChatroomId: chatroomData.myChatroom._id }
                })
            }
        }
    }

    // Submit handle
    const onSubmit = () => {
        // Check
        if (typeof text !== 'string' || !text.length) return
        // Reset
        setText('')
        // Send
        let sc = socket.getSocket();
        if (!sc) return;
        sc.transmit(common.packet.MESSAGE, {
            evt: common.event.MESSAGE.SEND,
            data: { text, chatroomId }
        })
        // Transmit typing
        setOnTyping(false);
        sendTyping(false);
    }

    // Input handle
    const onChangeText = (value: string) => {
        setText(value);
        sendRead();
        if (!onTyping && value) {
            // Set state
            setOnTyping(true);
            // Transmit
            sendTyping(true);
        } else if (onTyping && !value) {
            // Set state
            setOnTyping(false);
            // Transmit
            sendTyping(false);
        }
    }

    const onForcusInput = () => {
        sendRead()
    }

    const onBlurInput = () => {
        if (onTyping) {
            // Set state
            setOnTyping(false);
            // Transmit
            sendTyping(false);
        }
    }

    return (
        <View style={style.message.control.wrap}>
            <View
                style={style.message.control.input}
            >
                <TextInput
                    placeholder="Aa"
                    placeholderTextColor={baseStyle.color.textLight.color}
                    style={style.component.inputGroup.text}
                    autoCorrect={false}
                    autoCompleteType="off"
                    value={text}
                    onChangeText={onChangeText}
                    onFocus={onForcusInput}
                    onBlur={onBlurInput}
                />
            </View>
            <TouchableOpacity
                onPress={onSubmit}
            >
                <Icon
                    name="paper-plane"
                    size={20}
                    style={style.message.control.btnSend}
                />
            </TouchableOpacity>
        </View>
    )
}

export default connect(({ chatroom }: IStoreState) => ({ chatroom }))(MessageControl);