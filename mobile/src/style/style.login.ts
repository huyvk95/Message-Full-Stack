import { StyleSheet } from "react-native";
import baseStyle from "./base";

const login = StyleSheet.create({
    wrap: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        marginBottom: 20,
    },
    title: {
        fontSize: baseStyle.size.textTitle.fontSize,
        marginBottom: 10,
    },
    message: {
        marginBottom: 10,
    },
    input: StyleSheet.flatten([
        baseStyle.component.inputText,
        StyleSheet.create({
            custom: {
                marginVertical: 5
            }
        }).custom
    ]),
    button: StyleSheet.flatten([
        baseStyle.component.button,
        StyleSheet.create({
            custom: {
                marginVertical: 5
            }
        }).custom
    ]),
    buttonText: baseStyle.component.buttonText
})

export default login