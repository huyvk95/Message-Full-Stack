import React from "react";
import { View, StyleSheet } from "react-native";
import style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";

interface IAvatarProps {
    size: "langer" | "normal" | "small" | "smaller" | "tiny",
    url?: string,
    styleCustom?: object
}

const AvatarComponent = ({ size, styleCustom }: IAvatarProps) => {
    let radius = size === "langer" ? 100 : size === "normal" ? 60 : size === "small" ? 45 : size === "smaller" ? 35 : 20

    return (
        <View
            style={StyleSheet.flatten([
                style.component.avatar.wrap,
                StyleSheet.create({
                    custom: {
                        width: radius,
                        height: radius,
                        borderRadius: radius * 0.5,
                    }
                }).custom,
                styleCustom || {}
            ])}
        >
            <Icon
                name="user"
                size={radius * 0.7}
            />
        </View>
    )
}

export default AvatarComponent;