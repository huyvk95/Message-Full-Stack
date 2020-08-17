import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IComponentProps } from "../interface/interface.component";
import style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";

const SubviewHeader = ({ navigation }: IComponentProps) => {
    return (
        <View style={style.subview.header.wrap}>
            <TouchableOpacity
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
                    style={style.subview.header.arrow}
                />
            </TouchableOpacity>
        </View>
    )
}

export default SubviewHeader;