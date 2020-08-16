import React from "react";
import { View, StyleSheet, Image } from "react-native";

interface IDotProps {
    radius: number,
    color: string,
    style?: any
}

const DotComponent = ({ radius, color, style }: IDotProps) => {
    return (
        <View style={StyleSheet.flatten([
            {
                position: "absolute",
                width: radius,
                height: radius,
                backgroundColor: color,
                borderRadius: radius * 0.5,
            },
            style || {}
        ])} />
    )
}

export default DotComponent;