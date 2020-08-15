import React from "react";
import { View, Button } from "react-native";
import style from "../style";
import MessageHeader from "../component/component.message.header";
import MessageControl from "../component/component.message.control";
import MessageContent from "../component/component.message.content";
import { IComponentProps } from "../interface/ComponentInterface";

const MessageContainer = ({ navigation }: IComponentProps) => {
    return (
        <View style={style.message.message.wrap}>
            {/* <Button
                title="OK"
                onPress={() => { navigation.navigate("main") }}
            /> */}
            <MessageHeader />
            <MessageContent />
            <MessageControl />
        </View>
    )
}

export default MessageContainer;