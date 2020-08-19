import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { connect } from "react-redux";
import { IStoreState, IMessageData, IUserData, IFriendData } from "../interface/interface.data";
import { IMessageContent } from "../interface/interface.component";
import { FlatList } from "react-native-gesture-handler";
import { BORDER_RADIUS } from "../style/base/style.base.component";
import style from "../style";
import AvatarComponent from "./component.avatar";
import socket from "../socket";
import common from "../common";

const MessageContent = ({ chatroomId, chatroom, message, user }: IMessageContent) => {
    let [loading, setLoading]: [boolean, Function] = useState(false);

    useEffect(() => { }, [])

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        let { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;
        let topOffset = contentSize.height - layoutMeasurement.height - contentOffset.y
        if (typeof topOffset === 'number' && topOffset === 0 && !loading) {
            setLoading(true);
            let sc = socket.getSocket()
            if (sc) sc.transmit(common.packet.MESSAGE, { evt: common.event.MESSAGE.GET, data: { chatroomId: chatroomId, skip: messageData.length } })
            setTimeout(() => { setLoading(false); }, 1000)
        }
    };

    // Get chatroom data
    let chatroomData = chatroom.find(o => o.chatroom._id === chatroomId);
    if (!chatroomData) return (
        <div className="d-flex w-100 h-100 justify-content-center align-items-center text-20">
            Let's start your first conversation
        </div>
    )

    // Get message list
    let messageData: IMessageData[] = [];
    if (chatroomId && message[chatroomId]) {
        messageData = message[chatroomId]
    }
    else {
        let sc = socket.getSocket()
        if (sc) sc.transmit(common.packet.MESSAGE, { evt: common.event.MESSAGE.GET, data: { chatroomId } })
    }

    return (
        <View style={StyleSheet.flatten([
            style.message.content.wrap,
            StyleSheet.create({
                custom: {
                }
            }).custom
        ])}>
            <FlatList
                contentContainerStyle={{ minHeight: "100%" }}
                inverted={true}
                data={messageData.map((o, i) => ({ data: o, preData: messageData[i - 1], nextData: messageData[i + 1], user, key: o._id }))}
                // refreshControl={<RefreshControl  refreshing={loading} onRefresh={onRefresh} />}
                onScroll={onScroll}
                renderItem={({ item }) => (
                    <ItemMessage
                        data={item.data}
                        preData={item.preData}
                        nextData={item.nextData}
                        user={item.user}
                    />
                )}
                keyExtractor={item => item.key}
            />
        </View>
    )
}

const ItemMessage = ({ data, preData, nextData, user }: { data: IMessageData, preData?: IMessageData, nextData?: IMessageData, user: IUserData }) => {
    let isMine = (data.user as IFriendData)._id === user._id;
    let isMidChat = (nextData?.user as IFriendData)?._id === (data.user as IFriendData)._id && (preData?.user as IFriendData)?._id === (data.user as IFriendData)._id;
    let isEndChat = (nextData?.user as IFriendData)?._id === (data.user as IFriendData)._id && (preData?.user as IFriendData)?._id !== (data.user as IFriendData)._id;
    let isTopChat = (nextData?.user as IFriendData)?._id !== (data.user as IFriendData)._id && (preData?.user as IFriendData)?._id === (data.user as IFriendData)._id;
    let isAloneChat = (nextData?.user as IFriendData)?._id !== (data.user as IFriendData)._id && (preData?.user as IFriendData)?._id !== (data.user as IFriendData)._id;

    return (
        <View style={StyleSheet.flatten([
            style.message.item.wrap,
            isMine ? style.message.item.wrapMine : {},
            StyleSheet.create({
                custom: {
                    marginBottom: isEndChat ? 10 : 0
                }
            }).custom
        ])}>
            <AvatarComponent
                url={(data.user as IFriendData).avatar}
                size="smaller"
                styleCustom={StyleSheet.flatten([
                    style.message.item.avatar,
                    !isMine ? {} : style.message.item.avatarMine,
                    isEndChat || isAloneChat ? {} : style.message.item.avatarInvisible,
                ])}
            />
            <View style={StyleSheet.flatten([
                style.message.item.message,
                isMine ? style.message.item.messageMine : {},
                StyleSheet.create({
                    custom: {
                        borderTopLeftRadius: !isMine && (isEndChat || isMidChat) ? BORDER_RADIUS : style.message.item.message.borderRadius,
                        borderBottomLeftRadius: !isMine && (isTopChat || isMidChat) ? BORDER_RADIUS : style.message.item.message.borderRadius,
                        borderTopRightRadius: isMine && (isEndChat || isMidChat) ? BORDER_RADIUS : style.message.item.message.borderRadius,
                        borderBottomRightRadius: isMine && (isTopChat || isMidChat) ? BORDER_RADIUS : style.message.item.message.borderRadius,
                    }
                }).custom
            ])}>
                <Text style={StyleSheet.flatten([
                    style.message.item.messageText,
                    isMine ? style.message.item.messageTextMine : {}
                ])}>
                    {data.message}
                </Text>
            </View>
        </View>
    )
}

export default connect(({ chatroom, friend, message, user }: IStoreState) => ({
    chatroom, friend, message, user
}))(MessageContent);