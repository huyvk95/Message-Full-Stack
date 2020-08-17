import { StyleSheet } from "react-native";
import baseStyle from "./base";
import component from "./style.component";
import color from "./base/style.base.color";

const content = StyleSheet.create({
    wrap: {
        flex: 1,
    },

    avatar: {
        marginBottom: 5
    },

    email: {
        fontSize: 12,
        fontWeight: "300",
        marginBottom: 5
    },

    name: {
        fontSize: 25,
    },

    nicknameInput: {
        width: 200,
        borderRadius: 999,
        paddingLeft: 15
    },

    infoLayout: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    controlLayout: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 30,
    },

    buttonWrap: {
        flexDirection: "row",
        marginHorizontal: 15,
        alignItems: "center",
    },

    buttonIcon: {
        fontSize: 25,
        marginRight: 15,
    },

    buttonTextWrap: {
        flex: 1,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: color.borderSemiLight.borderColor,
    },

    buttonTextContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    buttonText: {
        textAlign: "left",
        fontSize: 16,
        fontWeight: "500"
    }
})

export default {
    content,
}