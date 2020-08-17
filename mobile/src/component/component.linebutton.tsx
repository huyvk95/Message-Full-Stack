import React from "react";
import Style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";
import IoniIcon from "react-native-vector-icons/Ionicons";
import { StyleSheet, View, Text } from "react-native";
import { TouchableWithoutFeedback, Switch } from "react-native-gesture-handler";

const LineButton = ({ icon, title, onPress, switchElem, style }: {
    icon: { ioni?: string, fontawesome?: string, style?: any }
    title: { text: string, style?: any }
    onPress?: Function
    style?: any
    switchElem?: { value: boolean, onChange: Function }
}) => {
    let cstyle = Style.userinfo.content;
    let styleIcon = StyleSheet.flatten([
        cstyle.buttonIcon,
        icon.style || {}
    ])
    let styleTitle = StyleSheet.flatten([
        cstyle.buttonText,
        title.style || {}
    ])

    return (
        <TouchableWithoutFeedback
            style={StyleSheet.flatten([
                cstyle.buttonWrap,
                style || {}
            ])}
            onPress={() => { if (typeof onPress === "function") onPress() }}
        >
            {
                icon.fontawesome ?
                    <Icon
                        name={icon.fontawesome}
                        style={styleIcon}
                    /> : icon.ioni ?
                        <IoniIcon
                            name={icon.ioni}
                            style={styleIcon}
                        /> :
                        <></>
            }
            <View style={StyleSheet.flatten([
                cstyle.buttonTextWrap,
                cstyle.buttonTextContent
            ])}>
                <Text style={styleTitle}>{title.text}</Text>
                {
                    switchElem ?
                        <Switch
                            onValueChange={(check) => {
                                if (typeof switchElem.onChange === "function") switchElem.onChange(check)
                            }}
                            value={switchElem.value}
                        />
                        :
                        <></>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LineButton