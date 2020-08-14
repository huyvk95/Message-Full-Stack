import React from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import style from "../style";
import baseStyle from "../style/base";

const LoginContainer = () => {
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
            <View>
                <TouchableWithoutFeedback>
                    <Text style={style.login.buttonText}>Sign In</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Text style={style.login.buttonText}>Sign Up</Text>
                </TouchableWithoutFeedback>
                <TextInput
                    style={style.login.input}
                    placeholder="Email address"
                    keyboardType="email-address"
                />
                <TextInput
                    style={style.login.input}
                    placeholder="Password"
                    secureTextEntry
                    returnKeyType="done"
                />
            </View>
            <TouchableOpacity
                style={style.login.button}
                onPress={() => { console.log("Click") }}
            >
                <Text style={style.login.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginContainer;