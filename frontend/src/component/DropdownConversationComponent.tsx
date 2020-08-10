import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { IDropdownConversationProps } from "../interface/ComponentInterface";
import { openPopup } from "../action/AppActions";
import PopupConfirmComponent from "./PopupConfirmComponent";
import socket from "../socket";
import common from "../common";

function DropdownConversationComponent({ openPopup, chatroom: chatroomData }: IDropdownConversationProps) {
    let { myChatroom, chatroom } = chatroomData
    return (
        <div className="setting_drop_content drop_content">
            <Button
                variant="outline-secondary drop_item"
                onClick={() => {
                    openPopup({
                        body: <PopupConfirmComponent
                            content={`Are you sure you want to delete this conversation?`}
                            buttons={[{
                                title: "Ok",
                                primary: true,
                                func: () => {
                                    let sc = socket.getSocket()
                                    if (!sc) return;
                                    sc.transmit(common.packet.CHATROOM, { evt: common.event.CHATROOM.UNFOLLOW, data: { chatroomId: chatroom._id } })
                                }
                            }, { title: "Cancel" }]}
                        />
                    })
                }}
            >
                Delete
            </Button>
            <div className="drop_seperate" />
            <Button
                variant="outline-secondary drop_item"
                onClick={() => {
                    // Send read
                    let sc = socket.getSocket();
                    if (!sc) return
                    sc.transmit(common.packet.CHATROOM, {
                        evt: myChatroom.read ? common.event.CHATROOM.MASK_AS_UNREAD : common.event.CHATROOM.MASK_AS_READ,
                        data: { userChatroomId: myChatroom._id }
                    })
                }}
            >
                {
                    myChatroom.read ? "Mask as unread" : "Mask as read"
                }
            </Button>
            <Button variant="outline-secondary drop_item">Archive</Button>
        </div>
    )
}

export default connect(null, { openPopup })(DropdownConversationComponent)