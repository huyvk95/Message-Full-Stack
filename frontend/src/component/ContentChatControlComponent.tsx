import React from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { IContentChatControlProps } from "../interface/ComponentInterface";
import { IStoreState } from "../interface/DataInterface";
import { connect } from "react-redux";

function ContentChatControlComponent({ chatroom, navigation }: IContentChatControlProps) {
    // Get chatroom data
    let chatroomId = navigation.chatroom;
    let chatroomData = chatroom.find(o => o.chatroom._id === chatroomId);
    if (!chatroomData) return (
        <div className="d-flex w-100 h-100 justify-content-center align-items-center text-20">
            Let's start your first conversation
        </div>
    )

    return (
        <div className="control-area px-3 py-2">
            <InputGroup>
                <FormControl
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
            <Button className="ml-2 btn-circle">
                <i className="fa fa-paper-plane" />
            </Button>
        </div>
    )
}

export default connect(({ navigation, chatroom }: IStoreState) => ({ navigation, chatroom }))(ContentChatControlComponent);