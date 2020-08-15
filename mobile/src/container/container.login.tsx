import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import style from "../style";
import baseStyle from "../style/base";
import { ILoginContainer } from "../interface/interface.component";

const LoginContainer = ({ navigation }: ILoginContainer) => {
    let [view, setView]: [string, Function] = useState("signin")

    return (
        <View style={style.login.wrap}>
            <Icon
                name="paper-plane"
                size={90}
                color={baseStyle.color.textPrimary.color}
                style={style.login.logo}
            />
            <Text style={style.login.title}>Messenger</Text>
            <Text style={style.login.message}>Sign in with Facebook to get started</Text>
            <View style={style.login.inputArea}>
                <View style={style.login.tabGroup}>
                    <TouchableHighlight
                        style={style.login.tabLeft}
                        onPress={() => { setView("signin") }}
                    >
                        <Text style={view === "signin" ? style.login.tabTextActive : style.login.tabText}>Sign In</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={style.login.tabRight}
                        onPress={() => { setView("signup") }}
                    >
                        <Text style={view === "signup" ? style.login.tabTextActive : style.login.tabText}>Sign Up</Text>
                    </TouchableHighlight>
                </View>
                <TextInput
                    style={style.login.inputMid}
                    placeholder="Email address"
                    keyboardType="email-address"
                    placeholderTextColor={baseStyle.color.textLight.color}
                />
                {
                    view === "signup" ? (
                        <View style={style.login.inputGroup}>
                            <TextInput
                                style={style.login.inputFirstName}
                                placeholder="First name"
                                placeholderTextColor={baseStyle.color.textLight.color}
                            />
                            <TextInput
                                style={style.login.inputLastName}
                                placeholder="Last name"
                                placeholderTextColor={baseStyle.color.textLight.color}
                            />
                        </View>
                    ) : <></>
                }
                <TextInput
                    style={view === "signup" ? style.login.inputMid : style.login.inputBot}
                    placeholder="Password"
                    secureTextEntry
                    returnKeyType="done"
                    placeholderTextColor={baseStyle.color.textLight.color}
                />
                {
                    view === "signup" ? (<TextInput
                        style={style.login.inputBot}
                        placeholder="Confirm password"
                        secureTextEntry
                        returnKeyType="done"
                        placeholderTextColor={baseStyle.color.textLight.color}
                    />) : <></>
                }
            </View>
            <TouchableOpacity
                style={style.login.button}
                onPress={() => { 
                    navigation.navigate('main')
                    console.log("Click") 
                }}
            >
                <Text style={style.login.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginContainer;