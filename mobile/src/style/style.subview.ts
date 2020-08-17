import { StyleSheet } from "react-native";
import baseStyle from "./base";
import component from "./style.component";
import color from "./base/style.base.color";

const subview = StyleSheet.create({
    wrap: {
        flex: 1
    },
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
})

const content = StyleSheet.create({
    wrap: {
        flex: 1,
    },
})

export default {
    subview,
    header,
    content,
}