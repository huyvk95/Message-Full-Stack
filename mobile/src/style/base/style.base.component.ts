import { StyleSheet } from "react-native";
import color from "./style.base.color";
import size from "./style.base.size";

export const COMPONENT_HEIGHT = 40;
export const COMPONENT_WIDTH = 280;
export const BORDER_RADIUS = 4;

const component = StyleSheet.create({
    /* INPUT */
    inputText: {
        height: COMPONENT_HEIGHT,
        width: COMPONENT_WIDTH,
        borderRadius: BORDER_RADIUS,
        borderColor: color.borderMidLight.borderColor,
        padding: 10,
        borderWidth: 1
    },

    inputMid: {
        borderRadius: 0,
        borderBottomWidth: 0,
    },

    inputBot: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },

    /* BUTTON */
    button: {
        height: COMPONENT_HEIGHT,
        width: COMPONENT_WIDTH,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: BORDER_RADIUS,
        backgroundColor: color.backgroundPrimary.backgroundColor,
    },

    buttonText: {
        color: color.textWhite.color,
        fontWeight: "bold",
        fontSize: size.text15.fontSize
    },

    buttonCircle: {
        height: COMPONENT_HEIGHT,
        width: COMPONENT_HEIGHT,
        borderRadius: COMPONENT_HEIGHT*0.5,
    },

    /* TAB */
    tabGroup: {
        flexDirection: "row",
        height: COMPONENT_HEIGHT,
        width: COMPONENT_WIDTH,
    },

    tabButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: color.borderMidLight.borderColor,
    },

    tabButtonLeft: {
        borderTopRightRadius: 0,
        borderRightWidth: 0,
    },

    tabButtonRight: {
        borderTopLeftRadius: 0,
    }
})

export default component;