import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Image, Platform } from "react-native";
import { IUserProfileContainer } from "../interface/interface.component";
import { IStoreState } from "../interface/interface.data";
import { connect } from "react-redux";
import { logout, updateUserData } from "../action/action.user";
import { toggleNotification, toggleSound } from "../action/action.app";
import { setConversationViewType, chooseContentTab } from "../action/action.navigation";
import { EConversationType, EContentTap } from "../common/common.type";
import style from "../style";
import SubviewHeader from "../component/component.subview.header";
import AvatarComponent from "../component/component.avatar";
import baseStyle from "../style/base";
import Dialog from "react-native-dialog";
import socket from "../socket";
import common from "../common";
import LineButton from "../component/component.linebutton";
import ImagePicker from "react-native-image-picker";
import * as api from "../api";
import * as Navigation from "../navigation";
import { ScrollView } from "react-native-gesture-handler";

const UserProfileContainer = ({ navigation, user, app, logout, toggleSound, toggleNotification, updateUserData, setConversationViewType }: IUserProfileContainer) => {
    let [onChangePassword, setOnChangePassword] = useState(false);
    let [onEditProfile, setOnEditProfile] = useState(false);
    let { _id, email, avatar, firstName, lastName } = user;
    let cstyle = style.userinfo.content;

    function onClickChangerAvatar() {
        ImagePicker.showImagePicker({
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }, async (response) => {
            try {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    // throw 'ImagePicker Error'
                } else if (response.customButton) {
                    // throw 'User tapped custom button'
                } else {
                    let avatar = ""
                    let formData = new FormData();
                    formData.append('file', {
                        uri: Platform.OS === "android" ? response.uri : response.uri.replace("file://", ""),
                        type: response.type,
                        name: 'photo.jpg',
                    });
                    let res = await api.uploadAvatar(formData)
                    if (res.success) avatar = res.data;
                    else throw res.message

                    if (avatar) {
                        let data: any = { avatar };
                        let sc = socket.getSocket()
                        if (sc) sc.invoke(common.packet.PROFILE,
                            {
                                evt: common.event.PROFILE.PUT,
                                data: data
                            }).then(data => {
                                updateUserData(data.data)
                            }).catch(err => {
                                console.log(err);
                            })
                    }
                }
            } catch (error) {
                Alert.alert(
                    "Error",
                    error,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                )
            }
        });
    }

    function onChatMessage() {
        setConversationViewType(EConversationType.NORMAL)
        Navigation.navigate("main")
        Navigation.navigate("chats")
    }

    function onArchiveMessage() {
        setConversationViewType(EConversationType.ARCHIVE)
        Navigation.navigate("main")
        Navigation.navigate("chats")
    }

    function onBlockMessage() {
        setConversationViewType(EConversationType.BLOCK)
        Navigation.navigate("main")
        Navigation.navigate("chats")
    }

    function onClickEditProfile() {
        setOnEditProfile(true)
    }

    function onClickChangePassword() {
        setOnChangePassword(true)
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
                    <ScrollView>
                        <LineButton
                            icon={{ ioni: "notifications" }}
                            title={{ text: "Notification" }}
                            switchElem={{ onChange: (check: boolean) => { toggleNotification(check) }, value: app.notification }}
                        />

                        <LineButton
                            icon={{ fontawesome: "music" }}
                            title={{ text: "Sound" }}
                            switchElem={{ onChange: (check: boolean) => { toggleSound(check) }, value: app.sound }}
                        />

                        <LineButton
                            icon={{ ioni: "chatbubble" }}
                            title={{ text: "Chat message" }}
                            onPress={onChatMessage}
                        />

                        <LineButton
                            icon={{ ioni: "archive" }}
                            title={{ text: "Archive message" }}
                            onPress={onArchiveMessage}
                        />

                        <LineButton
                            icon={{ ioni: "remove-circle" }}
                            title={{ text: "Block message" }}
                            onPress={onBlockMessage}
                        />

                        <LineButton
                            icon={{ fontawesome: "user-circle-o" }}
                            title={{ text: "Change avatar" }}
                            onPress={onClickChangerAvatar}
                        />

                        <LineButton
                            icon={{ fontawesome: "edit" }}
                            title={{ text: "Edit profile" }}
                            onPress={onClickEditProfile}
                        />

                        <LineButton
                            icon={{ fontawesome: "unlock" }}
                            title={{ text: "Change password" }}
                            onPress={onClickChangePassword}
                        />

                        <LineButton
                            icon={{ fontawesome: "sign-out", style: baseStyle.color.textDanger }}
                            title={{ text: "Logout", style: baseStyle.color.textDanger }}
                            onPress={onClickLogout}
                        />
                    </ScrollView>
                </View>
            </View>
            <ChangePasswordDialog show={onChangePassword} setShow={setOnChangePassword} />
            <EditProfileDialog show={onEditProfile} setShow={setOnEditProfile} />
        </View>
    )
}

const ChangePasswordDialog = connect(null, { updateUserData })(({ show, setShow, updateUserData }: {
    show: boolean,
    setShow: Function,
    updateUserData: Function
}) => {
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")
    let [oldPassword, setOldPassword] = useState("")

    return (
        <Dialog.Container visible={show}>
            <Dialog.Title>Change password</Dialog.Title>
            <Dialog.Input
                placeholder="Password"
                placeholderTextColor={baseStyle.color.textLight.color}
                secureTextEntry={true}
                onChangeText={(text: string) => { setPassword(text) }}
            />
            <Dialog.Input
                placeholder="Confirm password"
                placeholderTextColor={baseStyle.color.textLight.color}
                secureTextEntry={true}
                onChangeText={(text: string) => { setConfirmPassword(text) }}
            />
            <Dialog.Input
                placeholder="Old password"
                placeholderTextColor={baseStyle.color.textLight.color}
                secureTextEntry={true}
                onChangeText={(text: string) => { setOldPassword(text) }}
            />
            <Dialog.Button
                label="Cancel"
                onPress={() => {
                    setShow(false);
                }}
            />
            <Dialog.Button
                label="Submit"
                onPress={() => {
                    if (password === confirmPassword) {
                        let sc = socket.getSocket()
                        if (sc) sc.invoke(common.packet.PROFILE,
                            {
                                evt: common.event.PROFILE.PUT,
                                data: { oldPassword, password }
                            }).then(data => {
                                updateUserData(data.data)
                                setShow(false);
                            }).catch(err => {
                                Alert.alert(
                                    "Error",
                                    err,
                                    [
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ],
                                )
                            })
                    } else {
                        Alert.alert(
                            "Error",
                            "Password and confirm password not match",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                        )
                    }
                }}
            />
        </Dialog.Container>
    )
})

const EditProfileDialog = connect(null, { updateUserData })(({ show, setShow, updateUserData }: {
    show: boolean,
    setShow: Function,
    updateUserData: Function
}) => {
    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [oldPassword, setOldPassword] = useState("")

    return (
        <Dialog.Container visible={show}>
            <Dialog.Title>Change password</Dialog.Title>
            <Dialog.Input
                placeholder="First name"
                placeholderTextColor={baseStyle.color.textLight.color}
                onChangeText={(text: string) => { setFirstName(text) }}
            />
            <Dialog.Input
                placeholder="Last name"
                placeholderTextColor={baseStyle.color.textLight.color}
                onChangeText={(text: string) => { setLastName(text) }}
            />
            <Dialog.Input
                placeholder="Old password"
                placeholderTextColor={baseStyle.color.textLight.color}
                secureTextEntry={true}
                onChangeText={(text: string) => { setOldPassword(text) }}
            />
            <Dialog.Button
                label="Cancel"
                onPress={() => {
                    setShow(false);
                }}
            />
            <Dialog.Button
                label="Submit"
                onPress={() => {
                    let sc = socket.getSocket()
                    if (sc) sc.invoke(common.packet.PROFILE,
                        {
                            evt: common.event.PROFILE.PUT,
                            data: { oldPassword, firstName, lastName }
                        }).then(data => {
                            updateUserData(data.data)
                            setShow(false);
                        }).catch(err => {
                            Alert.alert(
                                "Error",
                                err,
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ],
                            )
                        })
                }}
            />
        </Dialog.Container>
    )
})

export default connect(({ user, app }: IStoreState) => ({
    app,
    user
}), {
    logout,
    toggleNotification,
    toggleSound,
    updateUserData,
    setConversationViewType,
})(UserProfileContainer);