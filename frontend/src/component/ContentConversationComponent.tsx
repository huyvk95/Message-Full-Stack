import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import ItemConversationComponent from "./ItemConversation";

export default function ContentConversationComponent() {
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
                    Array(20).fill('').map((o, i) => (
                        <ItemConversationComponent
                            data={{
                                name: "Hanoicomputer",
                                avatar: "https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/p120x120/80445897_1241804469363361_3410662782775853056_n.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=YWfOlvmj-fYAX980NL6&_nc_ht=scontent.fhan3-3.fna&_nc_tp=6&oh=6af6992ff4dbd6280429cab0c5057b9f&oe=5F50F074",
                                avatarRead: "",
                                lastMessageUser: "5f26a02a23077c2db9b32893",
                                lastMessage: "Bạn: có ai tư vấn không ạ",
                                lastMessageTime: new Date(),
                            }}
                            key={i}
                        />
                    ))
                }
            </div>
        </div>
    )
}