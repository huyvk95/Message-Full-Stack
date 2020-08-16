import { StyleSheet } from "react-native"
import baseStyle from "./base"
import color from "./base/style.base.color"
import size from "./base/style.base.size"

const avatar = StyleSheet.create({
    wrap: {
        alignItems: "center",
        justifyContent: "center",
    },

    imgContain: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: baseStyle.color.backgroundSemiLight.backgroundColor,
    },

    img: { height: "100%", width: "100%" }
})

const inputGroup = StyleSheet.create({
    wrap: StyleSheet.flatten([
        baseStyle.component.inputText,
        StyleSheet.create({
            custom: {
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 8,
                marginVertical: 8,
                borderWidth: 0,
                borderRadius: 8,
                backgroundColor: color.backgroundSemiLight.backgroundColor
            }
        }).custom
    ]),

    icon: {
        marginRight: 8,
        color: color.textLight.color
    },

    text: {
        flex: 1,
        color: color.textSemiDark.color,
        fontSize: size.text16.fontSize,
    }
})

export default {
    avatar,
    inputGroup
}