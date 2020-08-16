import React from "react";
import { View, Text } from "react-native";
import { TextInput, FlatList } from "react-native-gesture-handler";
import style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";
import AvatarComponent from "./component.avatar";
import baseStyle from "../style/base";
import { connect } from "react-redux";
import { IMainConversation, IItemConversation } from "../interface/interface.component";
import { IStoreState, IChatroomReducerData } from "../interface/interface.data";
import util from "../util";
import { EConversationType } from "../common/common.type";
import socket from "../socket";
import common from "../common";

const DATA = Object.keys(Array(20).fill(""))

const MainConversation = ({ chatroom }: IMainConversation) => {
    const renderItem = ({ item }: { item: IChatroomReducerData }) => (<ItemConversation data={item} />)

    return (
        <View style={{ backgroundColor: "#fff" }}>
            <View
                style={style.component.inputGroup.wrap}
            >
                <Icon
                    name="search"
                    size={20}
                    style={style.component.inputGroup.icon}
                />
                <TextInput
                    placeholder="Search"
                    style={style.component.inputGroup.text}
                    placeholderTextColor={baseStyle.color.textLight.color}
                />
            </View>
            <FlatList
                style={style.main.conversation.list}
                data={chatroom}
                renderItem={renderItem}
                keyExtractor={item => item.chatroom._id}
            />
        </View>
    )
}

const ItemConversationRaw = ({ data, friend, user, typing, navigation }: IItemConversation) => {
    // Props
    let { chatroom, friendsChatroom, myChatroom } = data;
    let { lastMessage, name, type, _id: chatroomId } = chatroom;
    // State
    // Variable
    // -Get friend data
    let friendsData = friendsChatroom.map(o => friend.find(oo => oo._id === o.user._id))
    // -Check i read message
    let read = myChatroom.read || lastMessage && (lastMessage.user as string) === user._id
    // -Chatroom name
    let chatroomName = chatroom.type === 'conversation' ?
        friendsData.length > 0 && friendsData[0]?.nickname ? friendsData[0]?.nickname :
            `${friendsChatroom[0]?.user?.lastName} ${friendsChatroom[0]?.user?.firstName}` : name
    // -Show typing
    let typingData = typing[chatroom._id]
    let showTyping = typingData && typingData.some(o => o._id !== user._id)
    // -Time display
    let tu = new Date(chatroom.updateTime)
    let tn = new Date()
    let tdisplay = ""
    if (tn.getTime() - tu.getTime() < 1000 * 60 * 60 * 24 && tn.getDate() === tu.getDate()) {
        tdisplay = `${util.string.zeroPad(tu.getHours(), 2)}:${util.string.zeroPad(tu.getMinutes(), 2)}`
    } else {
        tdisplay = `${tu.getDate()} Tháng ${tu.getMonth() + 1}`
    }
    // -Message prefix
    let msgPrefix = lastMessage && lastMessage.user === user._id ? "You: " : ""
    // -Check hide
    let show = (navigation.conversationView === EConversationType.NORMAL && myChatroom.show && !myChatroom.block && !myChatroom.archive && myChatroom.active) ||
        (navigation.conversationView === EConversationType.ARCHIVE && myChatroom.show && myChatroom.archive && myChatroom.active) ||
        (navigation.conversationView === EConversationType.BLOCK && myChatroom.show && myChatroom.block && myChatroom.active)

    const onClickItem = () => {
        // Send read
        let sc = socket.getSocket();
        if (!myChatroom.read && sc) {
            sc.transmit(common.packet.CHATROOM, {
                evt: common.event.CHATROOM.MASK_AS_READ,
                data: { userChatroomId: myChatroom._id }
            })
        }
    }

    return (
        <View style={style.main.conversation.item}>
            <AvatarComponent
                online={
                    chatroom.type !== "conversation" || friendsChatroom.length !== 1 || !friendsChatroom[0] ? undefined : {
                        status: friendsChatroom[0]?.user?.online,
                        lastOnlineTime: friendsChatroom[0]?.user?.lastOnlineTime,
                    }
                }
                url={type === "conversation" && friendsChatroom.length === 1 ? friendsChatroom[0].user.avatar : undefined}
                size="normal"
            />
            <View style={style.main.conversation.info}>
                <Text style={style.main.conversation.name}>{chatroomName}</Text>
                <View style={style.main.conversation.lastMessage}>
                    <Text>{`${msgPrefix}${lastMessage?.message}`}</Text>
                    <Text>·</Text>
                    <Text>{tdisplay}</Text>
                </View>
            </View>
            <View>

            </View>
        </View>
    )
}
const ItemConversation = connect(({ friend, typing, user, navigation }: IStoreState) => ({ friend, typing, user, navigation }))(ItemConversationRaw)

export default connect(({ chatroom }: IStoreState) => ({ chatroom }))(MainConversation);