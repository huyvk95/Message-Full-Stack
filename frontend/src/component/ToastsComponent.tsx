import React from "react";
import { IFriendRequest, IFriendData } from "../interface/DataInterface";
import { Button } from "react-bootstrap";
import socket from "../socket";
import common from "../common";
import AvatarComponent from "./AvatarComponent";

export function ToastFriendRequestComponent({ data }: { data: IFriendRequest }) {
    let { _id, from } = data;

    const onRefuseClick = () => {
        let sc = socket.getSocket()
        if (!sc) return;
        sc.transmit(common.packet.FRIEND, { evt: common.event.FRIEND.REFUSEFRIENDREQUEST, data: { requestId: _id } })
    }

    const onAccepClick = () => {
        let sc = socket.getSocket()
        if (!sc) return;
        sc.transmit(common.packet.FRIEND, { evt: common.event.FRIEND.ACCEPTFRIENDREQUEST, data: { requestId: _id } })
    }

    return (
        <div className="d-flex align-items-center">
            <div className="mr-2">
                <p className="text-normal"><strong className="text-bold">{`${from.lastName} ${from.firstName}`}</strong> has sent a friend request</p>
            </div>
            <div className="d-flex">
                <Button
                    variant="danger"
                    className="text-normal py-1 px-3 text-12"
                    onClick={onRefuseClick}
                >
                    Refuse
                </Button>
                <Button
                    variant="primary"
                    className="text-normal py-1 px-3 ml-2 text-12"
                    onClick={onAccepClick}
                >
                    Accept
                </Button>
            </div>
        </div>
    )
}

export function ToastFriendAcceptComponent({ data }: { data: IFriendData }) {
    let { firstName, lastName, avatar } = data;

    return (
        <div className="d-flex align-items-center">
            <AvatarComponent url={avatar} size="small" className="mr-2" />
            <div>
                <p className="text-normal">
                    You have become <strong className="text-bold">{`${lastName} ${firstName}'s`}</strong> friends
                </p>
            </div>
        </div>
    )
}