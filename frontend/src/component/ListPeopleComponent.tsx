import React from "react";
import { connect } from "react-redux";
import { IStoreState, IFriendData } from "../interface/DataInterface";
import { openPopup } from "../action/AppActions";
import AvatarComponent from "./AvatarComponent";
import PopupUserInfoComponent from "./PopupUserInfoComponent";

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
                                <Item
                                    data={o}
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
                                <Item
                                    data={o}
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

function PeopleItemComponent({ data, openPopup }: { data: IFriendData, openPopup: Function }) {
    let { avatar, firstName, lastName, nickname, online, lastOnlineTime } = data;

    const onClickItem = () => {
        openPopup({ body: <PopupUserInfoComponent data={data} form="friend" /> })
    }

    return (
        <div
            className="people-item px-3 py-2"
            style={{ cursor: "pointer" }}
            onClick={onClickItem}
        >
            <AvatarComponent
                url={avatar}
                size="normal"
                online={{
                    status: online,
                    lastOnlineTime
                }}
            />
            <p className="people-item-name text-normal text-18">{
                nickname ? nickname : `${lastName} ${firstName}`
            }</p>
        </div>
    )
}
const Item = connect(({ friend }: IStoreState) => ({ friend }), { openPopup })(PeopleItemComponent)
export default connect(({ friend }: IStoreState) => ({ friend }))(ListPeopleComponent)