import React from "react";
import style from "../style";
import AvatarComponent from "./component.avatar";
import common from "../common";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, StyleSheet } from "react-native";
import { IMainHeader } from "../interface/interface.component";
import { connect } from "react-redux";
import { IStoreState } from "../interface/interface.data";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import baseStyle from "../style/base";
import * as Navigation from "../navigation";

const MainHeader = ({ user, navigation }: IMainHeader) => {
    function onClickAddFriend() {
        console.log("onClickAddFriend")
    }

    function onClickAvatar() {
        Navigation.navigate('profile');
    }

    return (
        <View style={style.main.header.wrap}>
            <View style={{ flex: 1 }}>
                <AvatarComponent
                    url={user.avatar}
                    size="smaller"
                    onClick={onClickAvatar}
                />
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={style.main.header.title}>
                    {
                        navigation.contentTab === common.type.EContentTap.CONVERSATION ? "Chats" :
                            navigation.contentTab === common.type.EContentTap.PEOPLE ? "People" : ""
                    }
                </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <TouchableWithoutFeedback
                    style={StyleSheet.flatten([
                        baseStyle.component.button,
                        baseStyle.component.buttonCircle,
                        baseStyle.color.backgroundSemiLight
                    ])}
                    onPress={onClickAddFriend}
                >
                    <Icon
                        name="user-plus"
                        size={16}
                    />
                </TouchableWithoutFeedback>
            </View>
        </View >
    )
}

export default connect(({ user, navigation }: IStoreState) => ({ user, navigation }))(MainHeader);