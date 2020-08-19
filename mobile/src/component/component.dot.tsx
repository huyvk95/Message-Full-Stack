import React from "react";
import { View, StyleSheet, Image } from "react-native";

interface IDotProps {
    radius: number,
    color: string,
    style?: any
    childrent?: JSX.Element
}

const DotComponent = ({ radius, color, style, childrent }: IDotProps) => {
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
        ])} >
            {childrent}
        </View>
    )
}

export default DotComponent;