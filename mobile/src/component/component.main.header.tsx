import React from "react";
import { View, Text } from "react-native";
import style from "../style";
import AvatarComponent from "./component.avatar";

const MainHeader = () => {
    return (
        <View style={style.main.header.wrap}>
            <View style={{ flex: 1 }}>
                <AvatarComponent size="smaller" />
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={style.main.header.title}>Hello</Text>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>
    )
}

export default MainHeader;