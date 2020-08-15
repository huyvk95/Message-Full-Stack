import { StyleSheet } from "react-native";
import baseStyle from "./base";

const PADDING = 5;

const header = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        paddingHorizontal: PADDING,
    },

    title: {
        fontWeight: "bold",
        fontSize: baseStyle.size.text21.fontSize,
    },
})

const content = StyleSheet.create({
    wrap: {
        flex: 1,
        padding: PADDING,
    },

    // Search
    searchIcon: {
        marginRight: 5,
    }
})

export default {
    header,
    content,
}