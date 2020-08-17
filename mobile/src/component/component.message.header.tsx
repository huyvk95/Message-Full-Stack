import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import style from "../style";
import AvatarComponent from "./component.avatar";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { IComponentProps } from "../interface/interface.component";

const MessageHeader = ({ navigation }: IComponentProps) => {
    return (
        <View style={style.message.header.wrap}>
            <TouchableWithoutFeedback
                style={{ alignItems: "center" }}
                onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack()
                    } else {
                        navigation.navigate("main")
                    }
                }}
            >
                <Icon
                    name="angle-left"
                    style={style.message.header.arrow}
                />
            </TouchableWithoutFeedback>
            <AvatarComponent size="small" />
            <View style={style.message.header.info}>
                <Text style={style.message.header.infoTitle}>Cún (Mập)</Text>
                <Text style={style.message.header.infoTime}>Active 6m ago</Text>
            </View>
        </View>
    )
}

export default MessageHeader;