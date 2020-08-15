import React from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import style from "../style";
import MainHeader from "../component/component.main.header";
import MainContent from "../component/component.main.content";

const MainContainer = () => {
    return (
        <View style={style.main.content.wrap}>
            <MainHeader />
            <MainContent />
        </View>
    )
}

export default MainContainer;