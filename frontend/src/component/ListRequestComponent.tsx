import React from "react";
import { Button } from "react-bootstrap";
import AvatarComponent from "./AvatarComponent";
import { IFriendRequest, IStoreState, IFriendRequestReducer } from "../interface/DataInterface";
import { connect } from "react-redux";
import socket from "../socket";
import common from "../common";

function ListRequestComponent({ friendRequest }: { friendRequest: IFriendRequestReducer }) {
    let { receive } = friendRequest;

    return (
        <div className="list-request">
            {
                receive.map((o, i) => (
                    <ItemRequestComponent
                        data={o}
                        key={i}
                    />
                ))
            }
        </div>
    )
}

function ItemRequestComponent({ data }: { data: IFriendRequest }) {
    let { from, _id } = data;
    let { avatar, firstName, lastName } = from

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
        <div className="request-item mx-3 py-3">
            <div className="d-flex align-items-center">
                <AvatarComponent
                    url={avatar}
                    type="normal"
                />
                <p className="ml-2 text-normal text-18">{`${lastName} ${firstName}`}</p>
            </div>
            <div>
                <Button
                    variant="outline-danger"
                    className="btn-outline-custom"
                    onClick={onRefuseClick}
                >
                    Refuse
                </Button>
                <Button
                    variant="outline-primary"
                    className="btn-outline-custom ml-2"
                    onClick={onAccepClick}
                >
                    Accept
                </Button>
            </div>
        </div>
    )
}

export default connect(({ friendRequest }: IStoreState) => ({ friendRequest }))(ListRequestComponent)