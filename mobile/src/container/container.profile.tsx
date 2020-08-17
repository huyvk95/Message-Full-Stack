import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IUserProfileContainer } from "../interface/interface.component";
import { TouchableWithoutFeedback, Switch } from "react-native-gesture-handler";
import { IStoreState } from "../interface/interface.data";
import { connect } from "react-redux";
import style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";
import IoniIcon from "react-native-vector-icons/Ionicons";
import SubviewHeader from "../component/component.subview.header";
import AvatarComponent from "../component/component.avatar";
import baseStyle from "../style/base";
import { logout, updateUserData } from "../action/action.user";
import { toggleNotification, toggleSound } from "../action/action.app";
import Dialog from "react-native-dialog";
import socket from "../socket";
import common from "../common";

const UserProfileContainer = ({ navigation, user, app, logout, toggleSound, toggleNotification }: IUserProfileContainer) => {
    let [onChangePassword, setOnChangePassword] = useState(false);
    let { _id, email, avatar, firstName, lastName } = user;
    let cstyle = style.userinfo.content;

    function onClickChangerAvatar() {
        console.log("onClickChangerAvatar");
    }

    function onClickEditProfile() {
        console.log("onClickEditProfile");
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
                    <ButtonLine
                        icon={{ ioni: "notifications" }}
                        title={{ text: "Notification" }}
                        switchElem={{ onChange: (check: boolean) => { toggleNotification(check) }, value: app.notification }}
                    />

                    <ButtonLine
                        icon={{ fontawesome: "music" }}
                        title={{ text: "Sound" }}
                        switchElem={{ onChange: (check: boolean) => { toggleSound(check) }, value: app.sound }}
                    />

                    <ButtonLine
                        icon={{ fontawesome: "user-circle-o" }}
                        title={{ text: "Change avatar" }}
                        onPress={onClickChangerAvatar}
                    />

                    <ButtonLine
                        icon={{ fontawesome: "edit" }}
                        title={{ text: "Edit profile" }}
                        onPress={onClickEditProfile}
                    />

                    <ButtonLine
                        icon={{ fontawesome: "unlock" }}
                        title={{ text: "Change password" }}
                        onPress={onClickChangePassword}
                    />

                    <ButtonLine
                        icon={{ fontawesome: "sign-out", style: baseStyle.color.textDanger }}
                        title={{ text: "Logout", style: baseStyle.color.textDanger }}
                        onPress={onClickLogout}
                    />
                </View>
            </View>
            <ChangePasswordDialog show={onChangePassword} setShow={setOnChangePassword} />
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
                                // setError(true)
                            })
                    } else {
                        // setError(true)
                    }
                }}
            />
        </Dialog.Container>
    )
})

const ButtonLine = ({ icon, title, onPress, switchElem }: {
    icon: { ioni?: string, fontawesome?: string, style?: any }
    title: { text: string, style?: any }
    onPress?: Function
    switchElem?: { value: boolean, onChange: Function }
}) => {
    let cstyle = style.userinfo.content;
    let styleIcon = StyleSheet.flatten([
        cstyle.buttonIcon,
        icon.style || {}
    ])
    let styleTitle = StyleSheet.flatten([
        cstyle.buttonText,
        title.style || {}
    ])

    return (
        <TouchableWithoutFeedback
            style={cstyle.buttonWrap}
            onPress={() => { if (typeof onPress === "function") onPress() }}
        >
            {
                icon.fontawesome ?
                    <Icon
                        name={icon.fontawesome}
                        style={styleIcon}
                    /> : icon.ioni ?
                        <IoniIcon
                            name={icon.ioni}
                            style={styleIcon}
                        /> :
                        <></>
            }
            <View style={StyleSheet.flatten([
                cstyle.buttonTextWrap,
                cstyle.buttonTextContent
            ])}>
                <Text style={styleTitle}>{title.text}</Text>
                {
                    switchElem ?
                        <Switch
                            onValueChange={(check) => {
                                if (typeof switchElem.onChange === "function") switchElem.onChange(check)
                            }}
                            value={switchElem.value}
                        />
                        :
                        <></>
                }
            </View>
        </TouchableWithoutFeedback>
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