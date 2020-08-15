import React from "react";
import { View, Button } from "react-native";
import style from "../style";
import MainHeader from "../component/component.main.header";
import MainContent from "../component/component.main.content";
import { IComponentProps } from "../interface/ComponentInterface";

const MainContainer = ({ navigation }: IComponentProps) => {
    return (
        <View style={style.main.content.wrap}>
            {/* <Button
                title="OK"
                onPress={() => { navigation.navigate("message") }}
            /> */}
            <MainHeader />
            <MainContent />
            {/* <MainFooter /> */}
        </View>
    )
}

export default MainContainer;