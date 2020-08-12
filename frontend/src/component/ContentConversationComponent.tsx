import React, { useEffect, useState, ChangeEvent } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import ItemConversationComponent from "./ItemConversation";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IContentConversationProps } from "../interface/ComponentInterface";
import socket from "../socket";
import common from "../common";

function ContentConversationComponent({ chatroom }: IContentConversationProps) {
    let [loading, setLoading]: [boolean, Function] = useState(false);
    let [search, setSearch]: [string, Function] = useState("");
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

    const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    let chatroomFilter = chatroom.filter(o => o.friendsChatroom.some(oo => {
        return new RegExp(`.*${search}.*`, "i").test(oo.user.email) ||
            new RegExp(`.*${search}.*`, "i").test(oo.user.firstName) ||
            new RegExp(`.*${search}.*`, "i").test(oo.user.lastName) ||
            new RegExp(`.*${search}.*`, "i").test(oo.user.nickname)
    }))

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
                        onChange={onChangeSearch}
                    />
                </InputGroup>
            </div>
            <div className="list-conversation" id="list-conversation">
                {
                    chatroomFilter.map((o, i) => (
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