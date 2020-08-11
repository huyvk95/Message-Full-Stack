import React, { ChangeEvent, useState } from "react";
import { InputGroup, FormControl, Spinner } from "react-bootstrap";
import AvatarComponent from "./AvatarComponent";
import socket from "../socket";
import common from "../common";
import { connect } from "react-redux";
import { IFriendData } from "../interface/DataInterface";
import { openPopup } from "../action/AppActions";
import PopupUserInfoComponent from "./PopupUserInfoComponent";

let timeOut: NodeJS.Timeout | undefined = undefined;
export default function PopupSearchUserComponent() {
    let [users, setUsers]: [IFriendData[], Function] = useState([])
    let [onSearch, setOnSearch] = useState(false)

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        let sc = socket.getSocket()
        // Clear timeout
        if (timeOut) clearTimeout(timeOut)
        // Set search state
        if (!onSearch) setOnSearch(true)
        // Set new timeout
        timeOut = setTimeout(() => {
            if (timeOut) clearTimeout(timeOut)
            if (value && sc) {
                sc.invoke(common.packet.USER, { evt: common.event.USER.GET, data: { string: value } })
                    .then(data => {
                        setUsers(data)
                    })
            }
            setOnSearch(false)
        }, 300)
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
                    placeholder="Find on message"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={onInputChange}
                />
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1">
                        {onSearch ? <Spinner size="sm" animation="border" /> : <></>}
                    </InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
            <div className="popup-content">
                {
                    users.map((o, i) => (
                        <Item
                            data={o}
                            key={i}
                        />
                    ))
                }
            </div>
        </div>
    )
}

function SearchUserItemComponent({ data, openPopup }: { openPopup: Function, data: IFriendData }) {
    let { lastName, firstName, avatar, email } = data;

    const onClickItem = () => {
        openPopup({ body: <PopupUserInfoComponent data={data} />, openRecent: true })
    }

    return (
        <div
            className="popup-item px-3 pb-1"
            style={{ cursor: "pointer" }}
            onClick={onClickItem}
        >
            <AvatarComponent url={avatar} size="normal" />
            <div className="popup-item-name">
                <p className="text-normal text-18">{`${lastName} ${firstName}`}</p>
                <p className="text-normal text-11">{email}</p>
            </div>
        </div>
    )
}

const Item = connect(null, { openPopup })(SearchUserItemComponent)