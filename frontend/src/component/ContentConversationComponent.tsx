import React, { useEffect, useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import ItemConversationComponent from "./ItemConversation";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IContentConversationProps } from "../interface/ComponentInterface";
import socket from "../socket";
import common from "../common";

function ContentConversationComponent({ chatroom }: IContentConversationProps) {
    let [loading, setLoading]: [boolean, Function] = useState(false);
    // Check scroll
    useEffect(() => {
        let listArea = document.getElementById('list-conversation');
        if (listArea) {
            listArea.addEventListener('scroll', (event) => {
                let bottomOffset = (event.target as any).scrollTop;
                if ((event.target as any).scrollHeight - (event.target as any).scrollTop === listArea?.clientHeight && !loading) {
                    setLoading(true);
                    let sc = socket.getSocket()
                    if (sc) sc.transmit(common.packet.CHATROOM, { evt: common.event.CHATROOM.GETALLUSERCHATROOMS, data: { skip: chatroom.length } })
                    setTimeout(() => { setLoading(false); }, 1000)
                }
            });
        }
    })

    return (
        <div className="content-conversation">
            <div className="px-3 pt-2 pb-3">
                <InputGroup className="search">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                            <i className="fa fa-search" />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Find on message"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </div>
            <div className="list-conversation" id="list-conversation">
                {
                    chatroom.map((o, i) => (
                        <ItemConversationComponent
                            data={o}
                            key={i}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default connect(({ chatroom }: IStoreState) => ({ chatroom }))(ContentConversationComponent)