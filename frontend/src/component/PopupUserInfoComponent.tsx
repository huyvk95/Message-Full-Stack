import React, { ChangeEvent, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import AvatarComponent from "./AvatarComponent";
import socket from "../socket";
import common from "../common";
import { IFriendData } from "../interface/DataInterface";

export default function PopupUserInfoComponent(props: { data: IFriendData }) {
    let { active, lastName, email, firstName, lastOnlineTime, online, avatar, _id } = props.data

    return (
        <div className="popup_user_info">
            <AvatarComponent url={avatar} type="langer" className="mb-2"/>
            <div className="text-normal text-13">{email}</div>
            <div className="mb-4 text-normal text-30">{`${lastName} ${firstName}`}</div>
            <div className="control-area">
                <Button variant="outline-primary">
                    <i className="fa fa-comment" />
                </Button>
                <Button variant="outline-primary">
                    <i className="fa fa-user-plus" />
                </Button>
            </div>
        </div>
    )
}