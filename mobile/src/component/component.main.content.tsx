import React from "react";
import { View } from "react-native";
import style from "../style";
import baseStyle from "../style/base";
import MainConversation from "./component.main.conversation";

const MainContent = () => {
    return (
        <View style={style.main.content.wrap}>
            <MainConversation />
        </View>
    )
}

export default MainContent;