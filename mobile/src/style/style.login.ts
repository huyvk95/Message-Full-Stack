import { StyleSheet } from "react-native";
import baseStyle from "./base";

const login = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    // Content
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

    // Input
    inputArea: {
        marginVertical: 10
    },

    // -Tab
    tabGroup: baseStyle.component.tabGroup,

    tabLeft: StyleSheet.flatten([
        baseStyle.component.tabButton,
        baseStyle.component.tabButtonLeft
    ]),

    tabRight: StyleSheet.flatten([
        baseStyle.component.tabButton,
        baseStyle.component.tabButtonRight
    ]),

    tabText: StyleSheet.flatten([
        baseStyle.color.textLight,
        baseStyle.size.text15,
        StyleSheet.create({
            custom: {
                fontWeight: "bold"
            }
        }).custom
    ]),

    tabTextActive: StyleSheet.flatten([
        baseStyle.color.textPrimary,
        baseStyle.size.text15,
        StyleSheet.create({
            custom: {
                fontWeight: "bold"
            }
        }).custom
    ]),

    // -Input
    inputGroup: {
        flexDirection: "row",
    },

    inputFirstName: StyleSheet.flatten([
        baseStyle.component.inputText,
        baseStyle.component.inputMid,
        StyleSheet.create({
            custom: {
                flex: 1,
                borderRightWidth: 0,
            }
        }).custom
    ]),

    inputLastName: StyleSheet.flatten([
        baseStyle.component.inputText,
        baseStyle.component.inputMid,
        StyleSheet.create({
            custom: {
                flex: 1
            }
        }).custom
    ]),

    inputMid: StyleSheet.flatten([
        baseStyle.component.inputText,
        baseStyle.component.inputMid,
    ]),

    inputBot: StyleSheet.flatten([
        baseStyle.component.inputText,
        baseStyle.component.inputBot,
    ]),

    // Button
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