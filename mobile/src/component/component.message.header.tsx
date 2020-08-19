import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import style from "../style";
import AvatarComponent from "./component.avatar";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { IComponentProps, IMessageHeader } from "../interface/interface.component";
import { connect } from "react-redux";
import { IStoreState } from "../interface/interface.data";
import util from "../util";
import * as Navigation from "../navigation";

const MessageHeader = ({ navigation, chatroomId, chatroom, friend }: IMessageHeader) => {
    let chatroomData = chatroom.find(o => o.chatroom._id === chatroomId);
    if (!chatroomData) return (<></>)
    let { friendsChatroom } = chatroomData;
    // Get frienddata
    let friendsData = chatroomData.friendsChatroom.map(o => friend.find(oo => oo._id === o.user._id))
    // Chatroom name
    let chatroomName = chatroomData.chatroom.type === 'conversation' ?
        friendsData.length > 0 && friendsData[0]?.nickname ?
            friendsData[0]?.nickname :
            `${friendsChatroom[0]?.user?.lastName} ${friendsChatroom[0]?.user?.firstName}` :
        chatroomData.chatroom.name
    // Active time
    let activeTime = chatroomData.chatroom.type === 'conversation' && friendsChatroom.length > 0 && friendsChatroom[0]?.user?.online ? "Online" :
        friendsChatroom[0]?.user?.lastOnlineTime ? `Active ${util.string.roundTime(Date.now() - new Date(friendsChatroom[0]?.user?.lastOnlineTime).getTime(), true)} ago` : ""
    // Avatar
    let avtUrl = chatroomData.chatroom.type === 'conversation' && friendsChatroom.length > 0 ? friendsChatroom[0]?.user?.avatar : undefined
    // Click handle
    let clickHandle = () => {
        if (chatroomData && chatroomData.chatroom.type === 'conversation' && friendsChatroom.length > 0 && friendsChatroom[0]?.user) {
            Navigation.navigate('userInfo', { data: friendsChatroom[0].user });
        }
    }

    return (
        <View style={style.message.header.wrap}>
            <TouchableWithoutFeedback
                style={style.message.header.left}
                onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack()
                    } else {
                        navigation.navigate("main")
                    }
                }}
            >
                <View
                    style={{ alignItems: "center" }}
                >
                    <Icon
                        name="angle-left"
                        style={style.message.header.arrow}
                    />
                </View>
                <AvatarComponent
                    url={avtUrl}
                    size="small"
                />
                <View style={style.message.header.info}>
                    <Text style={style.message.header.infoTitle}>{chatroomName}</Text>
                    <Text style={style.message.header.infoTime}>{activeTime}</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                style={style.message.header.btnInfo}
                onPress={clickHandle}
            >
                <Icon
                    name="info-circle"
                    style={style.message.header.iconInfo}
                />
            </TouchableWithoutFeedback>
        </View>
    )
}

export default connect(({ chatroom, friend }: IStoreState) => ({ chatroom, friend }))(MessageHeader);