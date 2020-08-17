import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";
import AvatarComponent from "./component.avatar";
import baseStyle from "../style/base";
import { connect } from "react-redux";
import { IMainConversation, IItemConversation } from "../interface/interface.component";
import { IStoreState, IChatroomReducerData } from "../interface/interface.data";
import { EConversationType } from "../common/common.type";
import util from "../util";
import socket from "../socket";
import common from "../common";
import DotComponent from "./component.dot";
import * as Navigation from "../navigation";

const MainConversation = ({ chatroom }: IMainConversation) => {
    let [filter, setFilter] = useState("")
    const renderItem = ({ item }: { item: IChatroomReducerData }) => (<ItemConversation data={item} />)
    let data = chatroom.filter(o => o.friendsChatroom.some(oo => {
        return new RegExp(`.*${filter}.*`, "i").test(oo.user.email) ||
            new RegExp(`.*${filter}.*`, "i").test(oo.user.firstName) ||
            new RegExp(`.*${filter}.*`, "i").test(oo.user.lastName) ||
            new RegExp(`.*${filter}.*`, "i").test(oo.user.nickname)
    }))

    function onChangeFilter(text: string) {
        setFilter(text)
    }

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
                    value={filter}
                    style={style.component.inputGroup.text}
                    placeholderTextColor={baseStyle.color.textLight.color}
                    autoCorrect={false}
                    onChangeText={onChangeFilter}
                />
            </View>
            <FlatList
                style={style.main.conversation.list}
                data={data}
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
        // Set navigation
        Navigation.navigate('message');
    }

    return (
        <View>
            <TouchableWithoutFeedback
                style={StyleSheet.flatten([
                    style.main.conversation.item,
                    StyleSheet.create({
                        custom: {
                            display: show ? "flex" : "none"
                        }
                    }).custom
                ])}
                onPress={onClickItem}
            >
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
                    <Text style={StyleSheet.flatten([
                        style.main.conversation.name,
                        StyleSheet.create({
                            custom: {
                                fontWeight: read ? "normal" : "600"
                            }
                        }).custom
                    ])}>{chatroomName}</Text>
                    <View style={style.main.conversation.lastMessage}>
                        <Text style={style.main.conversation.lastMessageText}>{`${msgPrefix}${lastMessage?.message}`}</Text>
                        <Text style={style.main.conversation.lastMessageText}>·</Text>
                        <Text style={style.main.conversation.lastMessageText}>{tdisplay}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "center" }}>
                    {
                        !read ?
                            <DotComponent
                                radius={13}
                                color="#63bf38"
                                style={StyleSheet.flatten([
                                    baseStyle.color.backgroundPrimary,
                                    StyleSheet.create({
                                        custom: {
                                            position: "relative"
                                        }
                                    }).custom
                                ])}
                            />
                            :
                            lastMessage && (lastMessage.user as string) === user._id ?
                                <AvatarComponent
                                    url={type === "conversation" && friendsChatroom.length === 1 && friendsChatroom[0].read ? friendsChatroom[0].user.avatar : undefined}
                                    size="tiny"
                                    styleCustom={StyleSheet.create({
                                        custom: {
                                            display: friendsChatroom.some(o => o.read) ? "flex" : "none"
                                        }
                                    }).custom}
                                />
                                :
                                <></>
                    }
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}
const ItemConversation = connect(({ friend, typing, user, navigation }: IStoreState) => ({ friend, typing, user, navigation }))(ItemConversationRaw)

export default connect(({ chatroom }: IStoreState) => ({ chatroom }))(MainConversation);