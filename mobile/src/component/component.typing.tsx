import React, { useRef } from "react"
import { View, StyleSheet, Animated } from "react-native"
import Dot from "./component.dot"
import baseStyle from "../style/base"

const TypingComponent = ({ size, style }: { size: "normal" | "small", style?: object }) => {
    return (
        <View
            style={StyleSheet.flatten([
                {
                    flexDirection: "row",
                },
                style || {}
            ])}
        >
            <TypingDot index={0} size={size} />
            <TypingDot index={1} size={size} />
            <TypingDot index={2} size={size} />
        </View>
    )
}

const TypingDot = ({ index, size }: { index: number, size: "normal" | "small" }) => {
    const dotSize = size === 'small' ? 7 : 9;
    const dotMargin = size === 'small' ? 2 : 2.5;
    const dotMove = size === 'small' ? 1 : 2;
    const moveAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.sequence([
            Animated.delay(index * 200),
            Animated.loop(
                Animated.sequence(
                    [
                        Animated.timing(moveAnim,
                            {
                                toValue: -dotMove,
                                duration: 400,
                                useNativeDriver: true,
                            }),
                        Animated.timing(moveAnim,
                            {
                                toValue: dotMove,
                                duration: 400,
                                useNativeDriver: true,
                            })
                    ]
                )
            )
        ]).start()
    }, [moveAnim])


    return (
        <Animated.View style={
            {
                marginHorizontal: dotMargin,
                transform: [{ translateY: moveAnim }]
            }
        } >
            <Dot
                radius={dotSize}
                color={baseStyle.color.backgroundLight.backgroundColor}
                style={StyleSheet.create({ custom: { position: "relative" } }).custom}
            />
        </Animated.View>
    )
}

export default TypingComponent