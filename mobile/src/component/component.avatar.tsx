import React from "react";
import { View, StyleSheet, Image } from "react-native";
import style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";
import common from "../common";
import DotComponent from "./component.dot";
import BadgeComponent from "./component.badge";
import util from "../util";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as api from "../api";

interface IAvatarProps {
    size: "langer" | "normal" | "small" | "smaller" | "tiny",
    url?: string,
    styleCustom?: object,
    online?: {
        status: boolean,
        lastOnlineTime: string,
    }
    onClick?: Function
}

const AvatarComponent = ({ size, url, online, styleCustom, onClick }: IAvatarProps) => {
    let radius = size === "langer" ? 100 : size === "normal" ? 60 : size === "small" ? 45 : size === "smaller" ? 35 : 20
    return (
        <View>
            <TouchableWithoutFeedback
                style={StyleSheet.flatten([
                    style.component.avatar.wrap,
                    StyleSheet.create({
                        custom: {
                            width: radius,
                            height: radius,
                        }
                    }).custom,
                    styleCustom || {}
                ])}
                onPress={() => {
                    if (typeof onClick === "function") onClick()
                }}
            >
                <View
                    style={StyleSheet.flatten([
                        style.component.avatar.imgContain,
                        StyleSheet.create({
                            custom: {
                                borderRadius: radius * 0.5,
                            }
                        }).custom,
                    ])}
                >
                    {
                        url ?
                            <Image source={{ uri: `${api.getHost()}/${url}` }} style={style.component.avatar.img} />
                            :
                            <Icon
                                name="user"
                                size={radius * 0.7}
                            />
                    }
                </View>
                {
                    online ?
                        online.status ?
                            <DotComponent
                                radius={size !== "langer" ? 12 : 21}
                                color="#63bf38"
                                style={{
                                    bottom: size === "langer" ? 5 : 1,
                                    right: size === "langer" ? 5 : 1,
                                    display: size === "smaller" || size === "tiny" ? "none" : "flex"
                                }}
                            />
                            :
                            <BadgeComponent
                                text={util.string.roundTime(Date.now() - (new Date(online.lastOnlineTime)).getTime())}
                                height={size === "langer" ? 20 : size === "normal" ? 14 : size === "small" ? 12 : size === "smaller" ? 11 : 0}
                                style={{
                                    display: size === "tiny" ? "none" : "flex"
                                }}
                            />
                        :
                        <></>
                }
            </TouchableWithoutFeedback>
        </View>
    )
}

export default AvatarComponent;