import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableHighlight, NativeSyntheticEvent, TextInputChangeEventData, TextInputFocusEventData, GestureResponderEvent, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import style from "../style";
import baseStyle from "../style/base";
import { ILoginContainer } from "../interface/interface.component";
import util from "../util";
import { login, register } from "../action/action.user";
import { connect } from "react-redux";

const LoginContainer = ({ login, register }: ILoginContainer) => {
    let [view, setView]: [string, Function] = useState("signin");
    let [email, setEmail] = useState("huy00000@gmail.com");
    let [firstName, setFirstName] = useState("Huy");
    let [lastName, setLastName] = useState("Văn Khắc");
    let [password, setPassword] = useState("12345678");
    let [confirmPassword, setConfirmPassword] = useState("12345678");
    // let [isEmailFail, setIsEmailFail] = useState("");
    // let [isPasswordFail, setIsPasswordFail] = useState("");
    // let [isConfirmPasswordFail, setIsConfirmPasswordFail] = useState("");
    // let [isFirstNameFail, setIsFirstNameFail] = useState("");
    // let [isLastNameFail, setIsLastNameFail] = useState("");

    function onChangeEmail(text: string) {
        setEmail(text)
    }

    function onChangeFirstName(text: string) {
        setFirstName(text)
    }

    function onChangeLastName(text: string) {
        setLastName(text)
    }

    function onChangePassword(text: string) {
        setPassword(text)
    }

    function onChangeComfirmPassword(text: string) {
        setConfirmPassword(text)
    }

    function showError(err: string) {
        Alert.alert(
            "Error",
            err,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
        )
    }

    function onBlurEmail(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        let check = util.common.validateEmail(event.nativeEvent.text)
        // setIsEmailFail(check ? "" : "Invalid email format")
        if (!check) showError("Invalid email format")
    }

    function onBlurPassword(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        let value = event.nativeEvent.text;
        let check = value.length >= 8 || value.length <= 32
        // setIsPasswordFail(check ? "" : "Password length must be 8 character or more")
        if (!check) showError("Password length must be 8 character or more")
    }

    function onBlurConfirmPassword(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        let value = event.nativeEvent.text;
        let check = value.length >= 8 || value.length <= 32
        // setIsConfirmPasswordFail(check ? "" : "Confirm password length must be 8 character or more")
        if (!check) showError("Confirm password length must be 8 character or more")
    }

    function onBlurFirstName(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        let value = event.nativeEvent.text;
        let check = value.length ? true : false
        // setIsFirstNameFail(check ? "" : "First name required")
        if (!check) showError("First name required")
    }

    function onBlurLastName(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        let value = event.nativeEvent.text;
        let check = value.length ? true : false
        // setIsLastNameFail(check ? "" : "Last name required")
        if (!check) showError("Last name required")
    }

    function onClickSetViewType(type: string) {
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
        // setIsEmailFail("");
        // setIsPasswordFail("");
        // setIsConfirmPasswordFail("");
        // setIsFirstNameFail("");
        // setIsLastNameFail("");
        setView(type);
    }

    function onLoginSubmit(event: GestureResponderEvent) {
        // Check password
        if (password.length < 8 || password.length > 32) {
            // setIsPasswordFail("Password length must be 8 character or more")
            showError("Password length must be 8 character or more")
            return
        } else if (view === "signup" && password !== confirmPassword) {
            // setIsConfirmPasswordFail("Password confirmation doesn't match password")
            showError("Password confirmation doesn't match password")
            return
        }

        // Handle
        if (view === "signin") {
            login(email, password)
        } else if (view === "signup") {
            register({ email, password, confirmPassword, firstName, lastName })
        }
    }

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
                        onPress={() => { onClickSetViewType("signin") }}
                    >
                        <Text style={view === "signin" ? style.login.tabTextActive : style.login.tabText}>Sign In</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={style.login.tabRight}
                        onPress={() => { onClickSetViewType("signup") }}
                    >
                        <Text style={view === "signup" ? style.login.tabTextActive : style.login.tabText}>Sign Up</Text>
                    </TouchableHighlight>
                </View>
                <TextInput
                    style={style.login.inputMid}
                    placeholder="Email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={baseStyle.color.textLight.color}
                    value={email}
                    onChangeText={onChangeEmail}
                    onBlur={onBlurEmail}
                />
                {
                    view === "signup" ? (
                        <View style={style.login.inputGroup}>
                            <TextInput
                                style={style.login.inputFirstName}
                                placeholder="First name"
                                placeholderTextColor={baseStyle.color.textLight.color}
                                autoCorrect={false}
                                value={firstName}
                                onChangeText={onChangeFirstName}
                                onBlur={onBlurFirstName}
                            />
                            <TextInput
                                style={style.login.inputLastName}
                                placeholder="Last name"
                                placeholderTextColor={baseStyle.color.textLight.color}
                                autoCorrect={false}
                                value={lastName}
                                onChangeText={onChangeLastName}
                                onBlur={onBlurLastName}
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
                    value={password}
                    onChangeText={onChangePassword}
                    onBlur={onBlurPassword}
                />
                {
                    view === "signup" ? (<TextInput
                        style={style.login.inputBot}
                        placeholder="Confirm password"
                        secureTextEntry
                        returnKeyType="done"
                        placeholderTextColor={baseStyle.color.textLight.color}
                        value={confirmPassword}
                        onChangeText={onChangeComfirmPassword}
                        onBlur={onBlurConfirmPassword}
                    />) : <></>
                }
            </View>
            <TouchableOpacity
                style={style.login.button}
                onPress={onLoginSubmit}
            >
                <Text style={style.login.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default connect(null, { login, register })(LoginContainer);