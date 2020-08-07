import React from "react";
import AvatarComponent from "./AvatarComponent";
import { connect } from "react-redux";
import { IStoreState, IFriendData } from "../interface/DataInterface";

interface IItemProps {
    avatar?: string,
    name: string
}

function ListPeopleComponent({ friend }: { friend: IFriendData[] }) {
    let friendsOnline = friend.filter(o => o.online)
    let friendsOffline = friend.filter(o => !o.online)

    return (
        <div className="list-people">
            {
                friendsOnline.length ?
                    <>
                        <p className="text-normal text-light text-uppercase text-12 px-3 py-2">Active now</p>
                        {
                            friendsOnline.map((o, i) => (
                                <PeopleItemComponent
                                    avatar={o.avatar}
                                    name={`${o.lastName} ${o.firstName}`}
                                    key={i}
                                />
                            ))
                        }
                    </>
                    :
                    <></>
            }
            {
                friendsOffline.length ?
                    <>
                        <p className="text-normal text-light text-uppercase text-12 px-3 py-2">Friends</p>
                        {
                            friendsOffline.map((o, i) => (
                                <PeopleItemComponent
                                    avatar={o.avatar}
                                    name={`${o.lastName} ${o.firstName}`}
                                    key={i}
                                />
                            ))
                        }
                    </>
                    :
                    <></>
            }
        </div>
    )
}

function PeopleItemComponent({ name, avatar }: IItemProps) {
    return (
        <div className="people-item px-3 py-2">
            <AvatarComponent url={avatar} type="normal" />
            <p className="people-item-name text-normal text-18">{name}</p>
        </div>
    )
}

const mapStateToProps = ({ friend }: IStoreState) => ({ friend })
export default connect(mapStateToProps)(ListPeopleComponent)