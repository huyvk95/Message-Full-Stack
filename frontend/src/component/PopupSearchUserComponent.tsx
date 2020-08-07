import React, { ChangeEvent, useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import AvatarComponent from "./AvatarComponent";
import socket from "../socket";
import common from "../common";
import { IFriendData } from "../interface/DataInterface";

interface IItemProps {
    avatar?: string,
    name: string
}

let timeOut: NodeJS.Timeout | undefined = undefined;
export default function PopupSearchUserComponent() {
    let [users, setUsers]: [IFriendData[], Function] = useState([])

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        let sc = socket.getSocket()
        // Clear timeout
        if (timeOut) clearTimeout(timeOut)
        // Set new timeout
        timeOut = setTimeout(() => {
            if (timeOut) clearTimeout(timeOut)
            if (value && sc) {
                sc.invoke(common.packet.USER, { evt: common.event.USER.GET, data: { string: value } })
                    .then(data => { setUsers(data) })
            }
        }, 400)
    }

    return (
        <div className="popup_search_user">
            <InputGroup className="mb-1">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                        <i className="fa fa-search" />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Tìm kiếm trên Message"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={onInputChange}
                />
            </InputGroup>
            <div className="popup-content">
                {
                    users.map((o, i) => (
                        <SearchUserItemComponent
                            avatar={o.avatar}
                            name={`${o.lastName} ${o.firstName}`}
                            key={i}
                        />
                    ))
                }
            </div>
        </div>
    )
}

function SearchUserItemComponent({ name, avatar }: IItemProps) {
    return (
        <div className="popup-item px-3 pt-1 pb-2">
            <AvatarComponent url={avatar} type="normal" />
            <p className="popup-item-name text-normal text-18">{name}</p>
        </div>
    )
}