import React, { ChangeEvent } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import AvatarComponent from "./AvatarComponent";
import { IFriendData, IStoreState } from "../interface/DataInterface";
import { connect } from "react-redux";
import socket from "../socket";
import common from "../common";

let timeOut: NodeJS.Timeout | undefined = undefined;
function PopupUserInfoComponent({ data, friend }: { data: IFriendData, friend: IFriendData[] }) {
    let { lastName, email, firstName, avatar, _id, nickname } = data

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        let sc = socket.getSocket()
        // Clear timeout
        if (timeOut) clearTimeout(timeOut)
        // Set new timeout
        timeOut = setTimeout(() => {
            if (timeOut) clearTimeout(timeOut)
            if (typeof value === 'string' && sc) {
                sc.transmit(common.packet.FRIEND, { evt: common.event.FRIEND.SETNICKNAME, data: { friendId: _id, nickname: value } })
            }
        }, 400)
    }

    return (
        <div className="popup_user_info">
            <AvatarComponent url={avatar} type="langer" className="mb-2" />
            <div className="text-normal text-13">{email}</div>
            <div className="d-flex align-items-center flex-column mb-4">
                <div className="text-normal text-30">{`${lastName} ${firstName}`}</div>
                <div className={`nickname align-items-center ${friend.every(o => o._id !== _id) ? 'd-none' : 'd-flex'}`}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Nickname"
                            defaultValue={nickname}
                            aria-label="Nickname"
                            aria-describedby="basic-addon1"
                            onChange={onInputChange}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon1">
                                <i className="fa fa-pencil" />
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
            <div className="control-area">
                <Button variant="outline-primary">
                    <i className="fa fa-comment" />
                </Button>
                {
                    friend.every(o => o._id !== _id) ?
                        <Button variant="outline-primary" >
                            <i className="fa fa-user-plus" />
                        </Button>
                        :
                        <Button variant="outline-danger" >
                            <i className="fa fa-trash" />
                        </Button>
                }
            </div>
        </div>
    )
}

export default connect(({ friend }: IStoreState) => ({ friend }))(PopupUserInfoComponent)