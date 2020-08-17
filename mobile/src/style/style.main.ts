import { StyleSheet } from "react-native";
import { COMPONENT_HEIGHT } from "./base/style.base.component";
import baseStyle from "./base";
import color from "./base/style.base.color";
import size from "./base/style.base.size";

const PADDING = 5;

const header = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        paddingHorizontal: PADDING,
    },

    title: {
        fontWeight: "bold",
        fontSize: baseStyle.size.text23.fontSize,
    },
})

const footer = StyleSheet.create({
    wrap: {
        height: 50,
        flexDirection: "row",
    },

    item: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
    },

    itemIcon: {
        fontSize: 30
    },

    itemTitle: {
        fontSize: 12,
        fontWeight: "500"
    }
})

const content = StyleSheet.create({
    wrap: {
        flex: 1,
        padding: PADDING,
    },
})

const conversation = StyleSheet.create({
    list: { height: "100%" },
    item: { flexDirection: "row", marginVertical: 5 },
    info: { flex: 1, justifyContent: "center", marginLeft: 10 },
    name: { marginBottom: 4, fontWeight: "normal", fontSize: 16 },
    lastMessage: { flexDirection: "row" },
    lastMessageText: { fontWeight: "300", fontSize: 13 },
})

const people = StyleSheet.create({
    tabGroup: {
        flexDirection: "row"
    },

    tab: {
        flex: 1,
        alignItems: "center"
    },

    tabContent: StyleSheet.flatten([
        baseStyle.component.button,
        color.backgroundSemiLight,
        StyleSheet.create({
            custom: {
                width: 160,
                height: 30,
                borderRadius: 15,
                marginVertical: 5,
            }
        }).custom
    ]),

    tabTitleActive: StyleSheet.flatten([
        baseStyle.component.buttonText,
        color.textDark,
    ]),

    tabTitle: StyleSheet.flatten([
        baseStyle.component.buttonText,
        color.textLight,
    ]),

    list: {
        height: '100%',
        marginTop: 5,
    },

    itemPeople: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },

    itemPeopleWrap: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderColor: color.borderSemiLight.borderColor
    },

    itemPeopleInfo: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 10,
        paddingVertical: 12,
    },

    itemPeopleTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 2,
    },

    itemPeopleInfoText: {
        fontSize: 11,
    },

    itemPeopleControl: {
        flexDirection: "row",
        alignItems: "center"
    },

    itemPeopleButton: StyleSheet.flatten([
        baseStyle.component.button,
        color.backgroundSemiLight,
        StyleSheet.create({
            custom: {
                width: 70,
                height: 28,
                borderRadius: 15,
                marginHorizontal: 3
            }
        }).custom
    ]),

    itemPeopleButtonText: StyleSheet.flatten([
        baseStyle.component.buttonText,
        size.text14,
        color.textSemiDark
    ]),

    itemPeopleButtonTextActive: StyleSheet.flatten([
        baseStyle.component.buttonText,
        size.text14,
        color.textPrimary
    ])
})

export default {
    header,
    footer,
    content,
    conversation,
    people,
}