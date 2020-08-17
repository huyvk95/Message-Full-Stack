import React, { useState } from "react";
import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputFocusEventData, Alert } from "react-native";
import { IUserProfileContainer } from "../interface/interface.component";
import { TextInput, TouchableWithoutFeedback, Switch } from "react-native-gesture-handler";
import { IFriendData, IStoreState } from "../interface/interface.data";
import { connect } from "react-redux";
import style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";
import IoniIcon from "react-native-vector-icons/Ionicons";
import SubviewHeader from "../component/component.subview.header";
import AvatarComponent from "../component/component.avatar";
import baseStyle from "../style/base";
import { logout } from "../action/action.user";
import { toggleNotification, toggleSound } from "../action/action.app";
import socket from "../socket";
import common from "../common";

const UserProfileContainer = ({ navigation, user, app, logout, toggleSound, toggleNotification }: IUserProfileContainer) => {
    let { _id, email, avatar, firstName, lastName } = user;
    let cstyle = style.userinfo.content;

    function onClickChangerAvatar() {
        console.log("onClickChangerAvatar");
    }

    function onClickEditProfile() {
        console.log("onClickEditProfile");
    }

    function onClickChangePassword() {
        console.log("onClickChangePassword");
    }

    function onClickLogout() {
        logout();
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
                            styleCustom={style.userinfo.content.avatar}
                        />
                    </View>
                    <Text style={style.userinfo.content.email}>{email}</Text>
                    <Text style={style.userinfo.content.name}>{`${lastName} ${firstName}`}</Text>
                </View>
                <View style={StyleSheet.flatten([
                    cstyle.controlLayout,
                ])}>
                    <TouchableWithoutFeedback
                        style={cstyle.buttonWrap}
                    >
                        <IoniIcon
                            name="notifications"
                            style={cstyle.buttonIcon}
                        />
                        <View style={StyleSheet.flatten([
                            cstyle.buttonTextWrap,
                            cstyle.buttonTextContent
                        ])}>
                            <Text style={cstyle.buttonText}>Notification</Text>
                            <Switch
                                onValueChange={(check) => { toggleNotification(check) }}
                                value={app.notification}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        style={cstyle.buttonWrap}
                    >
                        <Icon
                            name="music"
                            style={cstyle.buttonIcon}
                        />
                        <View style={StyleSheet.flatten([
                            cstyle.buttonTextWrap,
                            cstyle.buttonTextContent
                        ])}>
                            <Text style={cstyle.buttonText}>Sound</Text>
                            <Switch
                                onValueChange={(check) => { toggleSound(check) }}
                                value={app.sound}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        style={StyleSheet.flatten([
                            cstyle.buttonWrap,
                        ])}
                        onPress={onClickChangerAvatar}
                    >
                        <Icon
                            name="user-circle-o"
                            style={StyleSheet.flatten([
                                cstyle.buttonIcon
                            ])}
                        />
                        <View style={cstyle.buttonTextWrap}>
                            <Text style={StyleSheet.flatten([
                                cstyle.buttonText
                            ])}>Change avatar</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        style={StyleSheet.flatten([
                            cstyle.buttonWrap,
                        ])}
                        onPress={onClickEditProfile}
                    >
                        <Icon
                            name="edit"
                            style={StyleSheet.flatten([
                                cstyle.buttonIcon
                            ])}
                        />
                        <View style={cstyle.buttonTextWrap}>
                            <Text style={StyleSheet.flatten([
                                cstyle.buttonText
                            ])}>Edit profile</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        style={StyleSheet.flatten([
                            cstyle.buttonWrap,
                        ])}
                        onPress={onClickChangePassword}
                    >
                        <Icon
                            name="unlock"
                            style={StyleSheet.flatten([
                                cstyle.buttonIcon
                            ])}
                        />
                        <View style={cstyle.buttonTextWrap}>
                            <Text style={StyleSheet.flatten([
                                cstyle.buttonText
                            ])}>Change password</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        style={StyleSheet.flatten([
                            cstyle.buttonWrap,
                        ])}
                        onPress={onClickLogout}
                    >
                        <Icon
                            name="sign-out"
                            style={StyleSheet.flatten([
                                cstyle.buttonIcon,
                                baseStyle.color.textDanger
                            ])}
                        />
                        <View style={cstyle.buttonTextWrap}>
                            <Text style={StyleSheet.flatten([
                                cstyle.buttonText,
                                baseStyle.color.textDanger
                            ])}>Logout</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}

export default connect(({ user, app }: IStoreState) => ({
    app,
    user
}), {
    logout,
    toggleNotification,
    toggleSound
})(UserProfileContainer);