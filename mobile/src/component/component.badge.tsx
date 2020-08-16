import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";
import common from "../common";

interface IBadgeProps {
    text: string,
    height: number,
    style?: any,
}

const BadgeComponent = ({ text, style, height }: IBadgeProps) => {
    return (
        <View style={StyleSheet.flatten([
            StyleSheet.create({
                custom: {
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1c2d1e",
                    height: height,
                    paddingHorizontal: Math.ceil(height * 0.3),
                    borderRadius: height * 0.5,
                }
            }).custom,
            style || {}
        ])} >
            <Text style={{
                color: "#63bf38",
                textAlign: "center",
                fontSize: Math.floor(height * 0.8),
                fontWeight: "bold"
            }}>
                {text}
            </Text>
        </View>
    )
}

export default BadgeComponent;