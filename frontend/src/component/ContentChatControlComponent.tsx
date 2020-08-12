import React, { useState } from "react";
import { InputGroup, Button, FormControl, Form } from "react-bootstrap";
import { IContentChatControlProps } from "../interface/ComponentInterface";
import { IStoreState } from "../interface/DataInterface";
import { connect } from "react-redux";
import socket from "../socket";
import common from "../common";

function ContentChatControlComponent({ chatroom, navigation }: IContentChatControlProps) {
    let [onTyping, setOnTyping] = useState(false);
    let [text, setText] = useState("");
    // Get chatroom data
    let chatroomId = navigation.chatroom;
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

    // Submit handle
    const onSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
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
    const onChangeText = (event: React.FormEvent<HTMLElement>) => {
        let value = (event.target as any).value;
        setText(value);
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

    const onBlurInput = () => {
        if (onTyping) {
            // Set state
            setOnTyping(false);
            // Transmit
            sendTyping(false);
        }
    }

    return (
        <Form
            className="control-area px-3 py-2"
            onSubmit={onSubmit}
        >
            <InputGroup>
                <FormControl
                    placeholder="Enter your message..."
                    aria-label="Enter your message..."
                    value={text}
                    aria-describedby="basic-addon1"
                    onChange={onChangeText}
                    onFocus={onForcusInput}
                    onBlur={onBlurInput}
                />
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
            <Button
                className="ml-2 btn-circle"
                onClick={onSubmit}
            >
                <i className="fa fa-paper-plane" />
            </Button>
        </Form>
    )
}

export default connect(({ navigation, chatroom }: IStoreState) => ({ navigation, chatroom }))(ContentChatControlComponent);