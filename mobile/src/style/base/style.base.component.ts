import { StyleSheet } from "react-native";
import color from "./style.base.color";
import size from "./style.base.size";

const COMPONENT_HEIGHT = 40;
const COMPONENT_WIDTH = 280;
const BORDER_RADIUS = 4;

const component = StyleSheet.create({
    inputText: {
        height: COMPONENT_HEIGHT,
        width: COMPONENT_WIDTH,
        borderRadius: BORDER_RADIUS,
        borderColor: color.borderMidLight.borderColor,
        padding: 10,
        borderWidth: 1
    },

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
    }
})

export default component;