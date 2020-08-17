import React, { useState } from "react";
import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputFocusEventData, Alert } from "react-native";
import style from "../style";
import { IUserInfoContainer } from "../interface/interface.component";
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { IFriendData, IStoreState } from "../interface/interface.data";
import Icon from "react-native-vector-icons/FontAwesome";
import SubviewHeader from "../component/component.subview.header";
import AvatarComponent from "../component/component.avatar";
import baseStyle from "../style/base";
import { connect } from "react-redux";
import socket from "../socket";
import common from "../common";

const UserInfoContainer = ({ navigation, route, friend }: IUserInfoContainer) => {
    let [onEditNickname, setOnEditNickname] = useState(false);
    let [inputNicknameValue, setInputNicknameValue] = useState("");
    let data: IFriendData = route?.params?.data
    let view = route?.params?.view
    let { _id, avatar, firstName, lastName, email, lastOnlineTime, online, nickname } = data;
    let isFriend = friend.some(o => o._id === _id);
    let cstyle = style.userinfo.content;

    function onClickSetNickname() {
        setOnEditNickname(!onEditNickname);
        setInputNicknameValue("");
    }

    function onClickSendMessage() {
        console.log("onClickSendMessage")
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

    function onChangeNickname(text: string) {
        setInputNicknameValue(text);
    }

    function onBlurInput(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        let sc = socket.getSocket()
        if (sc) sc.transmit(common.packet.FRIEND, {
            evt: common.event.FRIEND.SETNICKNAME,
            data: { friendId: _id, nickname: e.nativeEvent.text }
        })

        // Reset view
        setInputNicknameValue("");
        setOnEditNickname(false);
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
                    <View
                        style={StyleSheet.flatten([
                            style.component.inputGroup.wrap,
                            style.userinfo.content.nicknameInput,
                            StyleSheet.create({
                                custom: {
                                    display: onEditNickname ? "flex" : "none"
                                }
                            }).custom
                        ])}
                    >
                        <TextInput
                            placeholder="Nickname"
                            value={inputNicknameValue || ""}
                            style={style.component.inputGroup.text}
                            placeholderTextColor={baseStyle.color.textLight.color}
                            onChangeText={onChangeNickname}
                            onBlur={onBlurInput}
                        />
                        <Icon
                            name="pencil"
                            size={20}
                            style={style.component.inputGroup.icon}
                        />
                    </View>
                </View>
                <View style={StyleSheet.flatten([
                    cstyle.controlLayout,
                    StyleSheet.create({
                        custom: {
                            display: view === "info" ? "flex" : "none"
                        }
                    }).custom
                ])
                }>
                    <TouchableWithoutFeedback
                        style={StyleSheet.flatten([
                            cstyle.buttonWrap,
                            StyleSheet.create({
                                custom: {
                                    display: isFriend ? "flex" : "none"
                                }
                            }).custom
                        ])}
                        onPress={onClickSetNickname}
                    >
                        <Icon
                            name="tag"
                            style={cstyle.buttonIcon}
                        />
                        <View style={cstyle.buttonTextWrap}>
                            <Text style={cstyle.buttonText}>Set nickname</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        style={cstyle.buttonWrap}
                        onPress={onClickSendMessage}
                    >
                        <Icon
                            name="comment"
                            style={cstyle.buttonIcon}
                        />
                        <View style={cstyle.buttonTextWrap}>
                            <Text style={cstyle.buttonText}>Send message</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        style={StyleSheet.flatten([
                            cstyle.buttonWrap,
                            StyleSheet.create({
                                custom: {
                                    display: !isFriend ? "flex" : "none"
                                }
                            }).custom
                        ])}
                        onPress={onClickAddFriend}
                    >
                        <Icon
                            name="user-plus"
                            style={StyleSheet.flatten([
                                cstyle.buttonIcon,
                                baseStyle.color.textPrimary
                            ])}
                        />
                        <View style={cstyle.buttonTextWrap}>
                            <Text style={StyleSheet.flatten([
                                cstyle.buttonText,
                                baseStyle.color.textPrimary
                            ])}>Add friend</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        style={StyleSheet.flatten([
                            cstyle.buttonWrap,
                            StyleSheet.create({
                                custom: {
                                    display: isFriend ? "flex" : "none"
                                }
                            }).custom
                        ])}
                        onPress={onClickRemoveFriend}
                    >
                        <Icon
                            name="trash"
                            style={StyleSheet.flatten([
                                cstyle.buttonIcon,
                                baseStyle.color.textDanger
                            ])}
                        />
                        <View style={cstyle.buttonTextWrap}>
                            <Text style={StyleSheet.flatten([
                                cstyle.buttonText,
                                baseStyle.color.textDanger
                            ])}>Remove friend</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}

export default connect(({ friend }: IStoreState) => ({ friend }))(UserInfoContainer);