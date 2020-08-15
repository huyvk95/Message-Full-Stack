import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import style from "../style";
import AvatarComponent from "./component.avatar";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import baseStyle from "../style/base";

const MessageControl = () => {
    return (
        <View style={style.message.control.wrap}>
            <View
                style={style.message.control.input}
            >
                <TextInput
                    placeholder="Aa"
                    placeholderTextColor={baseStyle.color.textLight.color}
                    style={style.component.inputGroup.text}
                />
            </View>
            <TouchableOpacity
                onPress={() => { console.log("Press") }}
            >
                <Icon
                    name="paper-plane"
                    size={20}
                    style={style.message.control.btnSend}
                />
            </TouchableOpacity>
        </View>
    )
}

export default MessageControl;