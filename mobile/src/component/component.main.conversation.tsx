import React from "react";
import { View, Text, Button } from "react-native";
import { TextInput, FlatList } from "react-native-gesture-handler";
import style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";
import AvatarComponent from "./component.avatar";
import baseStyle from "../style/base";
import socket from "../socket";
import common from "../common";

const DATA = Object.keys(Array(20).fill(""))

const MainConversation = () => {
    const renderItem = () => (<ItemConversation />)

    return (
        <View style={{ backgroundColor: "#fff" }}>
            <Button
                title="OK"
                onPress={() => {
                    let sc = socket.getSocket();
                    if (!sc) return;
                    console.log("OK2", sc.clientId, sc.id)
                    sc.transmit(common.packet.FRIEND, { evt: common.event.FRIEND.GET })
                }}
            />
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
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item}
            />
        </View>
    )
}

const ItemConversation = () => {
    return (
        <View style={style.main.conversation.item}>
            <AvatarComponent size="normal" />
            <View style={style.main.conversation.info}>
                <Text style={style.main.conversation.name}>Cún (Mập)</Text>
                <View style={style.main.conversation.lastMessage}>
                    <Text>You: Xin chào</Text>
                    <Text>·</Text>
                    <Text>5:53 am</Text>
                </View>
            </View>
            <View>

            </View>
        </View>
    )
}

export default MainConversation;