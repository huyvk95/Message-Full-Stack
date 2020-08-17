import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Alert } from "react-native";
import { IUserInfoContainer } from "../interface/interface.component";
import { IFriendData, IStoreState } from "../interface/interface.data";
import style from "../style";
import SubviewHeader from "../component/component.subview.header";
import AvatarComponent from "../component/component.avatar";
import baseStyle from "../style/base";
import socket from "../socket";
import common from "../common";
import LineButton from "../component/component.linebutton";
import * as Navigation from "../navigation";

const UserInfoContainer = ({ navigation, route, friend, friendRequest, chatroom }: IUserInfoContainer) => {
    let data: IFriendData = route?.params?.data
    let { _id, avatar, firstName, lastName, email, lastOnlineTime, online, nickname } = data;
    let isFriend = friend.some(o => o._id === _id);
    let cstyle = style.userinfo.content;

    // Check friend request
    // -Check receive
    let frrData = friendRequest.receive.find(o => o.from._id === _id)
    // -Check sent
    let frsData = friendRequest.sent.find(o => o.to._id === _id)

    function onClickSetNickname() {
        Alert.prompt("Nickname", "Set your friend nickname", [
            {
                text: "OK", onPress: (text) => {
                    let sc = socket.getSocket()
                    if (sc) sc.transmit(common.packet.FRIEND, {
                        evt: common.event.FRIEND.SETNICKNAME,
                        data: { friendId: _id, nickname: text }
                    })
                }
            }
        ])
    }

    function onClickSendMessage() {
        // Find or create new chatroom
        let chatroomData = chatroom.find(o => {
            return o.chatroom.type === 'conversation' && o.friendsChatroom.length === 1 && o.friendsChatroom[0]._id === _id
        })
        if (chatroomData) Navigation.navigate('message', { chatroomId: chatroomData.chatroom._id });
        else {
            let sc = socket.getSocket();
            if (sc) sc.transmit(common.packet.CHATROOM,
                {
                    evt: common.event.CHATROOM.CREATE,
                    data: {
                        users: [_id],
                        type: 'conversation',
                    }
                })
        }
    }

    function onClickRemoveFriend() {
        Alert.alert(
            "Notice",
            `Are you sure you want to remove ${lastName} ${firstName} from your friends list?`,
            [
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => {
                        let sc = socket.getSocket()
                        if (!sc) return;
                        sc.transmit(common.packet.FRIEND, { evt: common.event.FRIEND.REMOVE, data: { friendId: _id } })
                    },
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    }

    function onClickAddFriend() {
        let sc = socket.getSocket()
        if (!sc) return;
        sc.transmit(common.packet.FRIEND, { evt: common.event.FRIEND.SENDFRIENDREQUEST, data: { userId: _id } })
    }

    function onClickAccept() {
        let sc = socket.getSocket()
        if (!sc || !frrData || !frrData._id) return;
        sc.transmit(common.packet.FRIEND, { evt: common.event.FRIEND.ACCEPTFRIENDREQUEST, data: { requestId: frrData._id } })
    }

    function onClickRefuse() {
        let sc = socket.getSocket()
        if (!sc || !frrData || !frrData._id) return;
        sc.transmit(common.packet.FRIEND, { evt: common.event.FRIEND.REFUSEFRIENDREQUEST, data: { requestId: frrData._id } })
    }

    function onClickCancelRequest() {
        let sc = socket.getSocket()
        if (!sc || !frsData || !frsData._id) return;
        sc.transmit(common.packet.FRIEND, { evt: common.event.FRIEND.CANCELFRIENDREQUEST, data: { requestId: frsData._id } })
    }

    return (
        <View style={style.subview.subview.wrap}>
            <SubviewHeader navigation={navigation} />
            <View style={style.userinfo.content.wrap}>
                <View style={style.userinfo.content.infoLayout}>
                    <View>
                        <AvatarComponent
                            size="langer"
                            url={avatar}
                            online={{
                                status: online,
                                lastOnlineTime
                            }}
                            styleCustom={style.userinfo.content.avatar}
                        />
                    </View>
                    <Text style={style.userinfo.content.email}>{email}</Text>
                    <Text style={style.userinfo.content.name}>{`${lastName} ${firstName}${nickname ? `(${nickname})` : ""}`}</Text>
                </View>
                <View style={StyleSheet.flatten([cstyle.controlLayout])
                }>
                    <LineButton
                        icon={{ fontawesome: "tag" }}
                        title={{ text: "Set nickname" }}
                        style={{ display: isFriend ? "flex" : "none" }}
                        onPress={onClickSetNickname}
                    />
                    <LineButton
                        icon={{ fontawesome: "comment" }}
                        title={{ text: "Send message" }}
                        onPress={onClickSendMessage}
                    />
                    <LineButton
                        icon={{ fontawesome: "times-circle", style: baseStyle.color.textDanger }}
                        title={{ text: "Cancel friend request", style: baseStyle.color.textDanger }}
                        style={{ display: !isFriend && frsData ? "flex" : "none" }}
                        onPress={onClickCancelRequest}
                    />
                    <LineButton
                        icon={{ fontawesome: "user-plus", style: baseStyle.color.textPrimary }}
                        title={{ text: "Accept friend request", style: baseStyle.color.textPrimary }}
                        style={{ display: !isFriend && frrData ? "flex" : "none" }}
                        onPress={onClickAccept}
                    />
                    <LineButton
                        icon={{ fontawesome: "user-times", style: baseStyle.color.textDanger }}
                        title={{ text: "Refuse friend request", style: baseStyle.color.textDanger }}
                        style={{ display: !isFriend && frrData ? "flex" : "none" }}
                        onPress={onClickRefuse}
                    />
                    <LineButton
                        icon={{ fontawesome: "user-plus", style: baseStyle.color.textPrimary }}
                        title={{ text: "Add friend", style: baseStyle.color.textPrimary }}
                        style={{ display: !isFriend && !frrData && !frsData ? "flex" : "none" }}
                        onPress={onClickAddFriend}
                    />
                    <LineButton
                        icon={{ fontawesome: "trash", style: baseStyle.color.textDanger }}
                        title={{ text: "Remove friend", style: baseStyle.color.textDanger }}
                        style={{ display: isFriend ? "flex" : "none" }}
                        onPress={onClickRemoveFriend}
                    />
                </View>
            </View>
        </View>
    )
}

export default connect(({ friend, friendRequest, chatroom }: IStoreState) => ({ friend, friendRequest, chatroom }))(UserInfoContainer);