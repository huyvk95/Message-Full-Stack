import React from "react";
import { View, Text, StyleSheet } from "react-native";
import style from "../style";
import AvatarComponent from "./component.avatar";

const MessageContent = () => {
    return (
        <View style={style.message.content.wrap}>
            <ItemMessage />
            <ItemMessage />
            <ItemMessage />
            <ItemMessage />
        </View>
    )
}

const ItemMessage = () => {
    return (
        <View style={StyleSheet.flatten([
            style.message.item.wrap,
            // style.message.item.wrapMine,
        ])}>
            <AvatarComponent
                size="smaller"
                styleCustom={StyleSheet.flatten([
                    style.message.item.avatar,
                    // style.message.item.avatarMine,
                ])}
            />
            <View style={StyleSheet.flatten([
                style.message.item.message,
                // style.message.item.messageMine
            ])}>
                <Text style={StyleSheet.flatten([
                    style.message.item.messageText,
                    // style.message.item.messageTextMine
                ])}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sequi at distinctio, laboriosam illum fugit molestias eum doloremque necessitatibus in perspiciatis magni unde aspernatur, iusto omnis nam iure et repudiandae.</Text>
            </View>
        </View>
    )
}

export default MessageContent;