import React from "react";
import { View, Text } from "react-native";
import { TextInput, FlatList } from "react-native-gesture-handler";
import style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";
import AvatarComponent from "./component.avatar";
import baseStyle from "../style/base";

const DATA = Object.keys(Array(20).fill(""))

const MainConversation = () => {
    const renderItem = () => (<ItemConversation />)

    return (
        <>
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
                />
            </View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item=>item}
            />
        </>
    )
}

const ItemConversation = () => {
    return (
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <AvatarComponent size="normal" />
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}>
                <Text style={{ marginBottom: 4 }}>Cún (Mập)</Text>
                <View style={{ flexDirection: "row" }}>
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