import React from "react";
import { Button } from "react-bootstrap";
import AvatarComponent from "./AvatarComponent";
import { IFriendData, IStoreState } from "../interface/DataInterface";
import { connect } from "react-redux";

function PopupUserInfoComponent({ data, friend }: { data: IFriendData, friend: IFriendData[] }) {
    let { lastName, email, firstName, avatar, _id } = data

    return (
        <div className="popup_user_info">
            <AvatarComponent url={avatar} type="langer" className="mb-2" />
            <div className="text-normal text-13">{email}</div>
            <div className="mb-4 text-normal text-30">{`${lastName} ${firstName}`}</div>
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
                        <></>
                }
            </div>
        </div>
    )
}

export default connect(({ friend }: IStoreState) => ({ friend }))(PopupUserInfoComponent)