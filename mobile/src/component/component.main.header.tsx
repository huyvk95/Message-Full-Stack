import React from "react";
import { View, Text } from "react-native";
import style from "../style";
import AvatarComponent from "./component.avatar";
import { IMainHeader } from "../interface/interface.component";
import { connect } from "react-redux";
import { IStoreState } from "../interface/interface.data";

const MainHeader = ({ user }: IMainHeader) => {
    return (
        <View style={style.main.header.wrap}>
            <View style={{ flex: 1 }}>
                <AvatarComponent
                    url={user.avatar}
                    size="smaller"
                />
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={style.main.header.title}>Hello</Text>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>
    )
}

export default connect(({ user }: IStoreState) => ({ user }))(MainHeader);