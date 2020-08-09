import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import ItemConversationComponent from "./ItemConversation";
import { connect } from "react-redux";
import { IStoreState } from "../interface/DataInterface";
import { IContentConversationProps } from "../interface/ComponentInterface";

function ContentConversationComponent({ chatroom }: IContentConversationProps) {
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
                        placeholder="Tìm kiếm trên Message"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </div>
            <div className="list-conversation">
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