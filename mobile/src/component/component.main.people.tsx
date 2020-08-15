import React from "react";
import { View, Text } from "react-native";
import { TextInput, FlatList, TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import style from "../style";
import Icon from "react-native-vector-icons/FontAwesome";
import AvatarComponent from "./component.avatar";
import baseStyle from "../style/base";

const DATA = Object.keys(Array(20).fill(""))

const MainPeople = () => {
    const renderItem = () => (<ItemPeople />)
    // const renderItem = () => (<ItemRequest />)

    return (
        <View style={{ backgroundColor: "#fff" }}>
            <View
                style={style.main.people.tabGroup}
            >
                <View style={style.main.people.tab}>
                    <TouchableWithoutFeedback
                        style={style.main.people.tabContent}
                        onPress={() => { console.log("Click") }}
                    >
                        <Text style={style.main.people.tabTitleActive}>Sign In</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={style.main.people.tab}>
                    <TouchableWithoutFeedback
                        style={style.main.people.tabContent}
                        onPress={() => { console.log("Click") }}
                    >
                        <Text style={style.main.people.tabTitle}>Sign In</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item}
                style={style.main.people.list}
            />

        </View>
    )
}

const ItemPeople = () => {
    return (
        <View style={style.main.people.itemPeople}>
            <AvatarComponent size="small" />
            <View style={style.main.people.itemPeopleWrap}>
                <View style={style.main.people.itemPeopleInfo}>
                    <Text style={style.main.people.itemPeopleTitle}>Cún (Mập)</Text>
                    <Text style={style.main.people.itemPeopleInfoText}>abcdef@gmail.com</Text>
                </View>
            </View>
        </View>
    )
}

const ItemRequest = () => {
    return (
        <View style={style.main.people.itemPeople}>
            <AvatarComponent size="small" />
            <View style={style.main.people.itemPeopleWrap}>
                <View style={style.main.people.itemPeopleInfo}>
                    <Text style={style.main.people.itemPeopleTitle}>Cún (Mập)</Text>
                    <Text style={style.main.people.itemPeopleInfoText}>abcdef@gmail.com</Text>
                </View>
                <View style={style.main.people.itemPeopleControl}>
                    <TouchableOpacity
                        style={style.main.people.itemPeopleButton}
                        onPress={() => { console.log("Click") }}
                    >
                        <Text style={style.main.people.itemPeopleButtonText}>Refuse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.main.people.itemPeopleButton}
                        onPress={() => { console.log("Click") }}
                    >
                        <Text style={style.main.people.itemPeopleButtonTextActive}>Accept</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MainPeople;