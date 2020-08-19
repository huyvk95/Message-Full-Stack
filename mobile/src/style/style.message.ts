import { StyleSheet } from "react-native";
import baseStyle from "./base";
import component from "./style.component";

const message = StyleSheet.create({
    wrap: {
        flex: 1,
    }
})

const header = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        alignItems: "center",
    },
    arrow: {
        fontSize: 40,
        paddingHorizontal: 5,
        marginRight: 5,
    },
    info: {
        flex: 1,
        paddingHorizontal: 10,
    },
    infoTitle: {
        fontWeight: "bold",
        fontSize: 18
    },
    infoTime: StyleSheet.flatten([
        baseStyle.color.textLight,
        baseStyle.size.text12,
    ])
})

const control = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    input: StyleSheet.flatten([
        component.inputGroup.wrap,
        StyleSheet.create({
            custom: {
                flex: 1,
                borderRadius: 100,
            }
        }).custom
    ]),
    btnSend: StyleSheet.flatten([
        baseStyle.color.textPrimary,
        StyleSheet.create({
            custom: {
                paddingHorizontal: 5,
                fontSize: 25,
            }
        }).custom
    ]),
})

const content = StyleSheet.create({
    wrap: {
        flex: 1,
        flexDirection: "column-reverse"
    },
})

const item = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 5,
        paddingVertical: 1,
    },

    wrapMine: {
        flexDirection: "row-reverse",
    },

    avatar: {
        marginRight: 10,
    },

    avatarMine: {
        display: "none"
    },

    avatarInvisible: {
        opacity: 0
    },

    message: {
        // flex: 1,
        maxWidth: 320,
        backgroundColor: baseStyle.color.backgroundSemiLight.backgroundColor,
        padding: 10,
        borderRadius: 15,
    },

    messageMine: {
        backgroundColor: baseStyle.color.backgroundPrimary.backgroundColor,
    },

    messageText: StyleSheet.flatten([
        baseStyle.color.textDark
    ]),

    messageTextMine: StyleSheet.flatten([
        baseStyle.color.textWhite
    ])
})

export default {
    message,
    header,
    control,
    content,
    item
}