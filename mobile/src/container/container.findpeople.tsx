import React, { useState } from "react";
import { View, Text } from "react-native";
import { IComponentProps, IItemPeople } from "../interface/interface.component";
import { TextInput, FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { IFriendData } from "../interface/interface.data";
import style from "../style";
import SubviewHeader from "../component/component.subview.header";
import Icon from "react-native-vector-icons/FontAwesome";
import baseStyle from "../style/base";
import AvatarComponent from "../component/component.avatar";
import * as Navigation from "../navigation";
import socket from "../socket";
import common from "../common";

let timeOut: NodeJS.Timeout | undefined = undefined;
const FindPeopleContainer = ({ navigation }: IComponentProps) => {
    let [users, setUsers]: [IFriendData[], Function] = useState([])
    let [onSearch, setOnSearch] = useState(false)

    function onChangeFilter(text: string) {
        let value = text;
        let sc = socket.getSocket()
        // Clear timeout
        if (timeOut) clearTimeout(timeOut)
        // Set search state
        if (!onSearch) setOnSearch(true)
        // Set new timeout
        timeOut = setTimeout(() => {
            if (timeOut) clearTimeout(timeOut)
            if (value && sc) {
                sc.invoke(common.packet.USER, { evt: common.event.USER.GET, data: { string: value } })
                    .then(data => {
                        setUsers(data)
                    })
            }
            setOnSearch(false)
        }, 300)
    }

    const renderItem = ({ item }: { item: any }) => (<ItemPeople data={item} />)

    return (
        <View style={style.subview.subview.wrap}>
            <SubviewHeader navigation={navigation} />
            <View style={{paddingHorizontal: 8}}>
                <View
                    style={style.component.inputGroup.wrap}
                >
                    <Icon
                        name="search"
                        size={20}
                        style={style.component.inputGroup.icon}
                    />
                    <TextInput
                        placeholder="Search"
                        style={style.component.inputGroup.text}
                        placeholderTextColor={baseStyle.color.textLight.color}
                        autoFocus={true}
                        autoCorrect={false}
                        onChangeText={onChangeFilter}
                    />
                </View>
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    style={style.main.people.list}
                />
            </View>
        </View>
    )
}

const ItemPeople = ({ data }: IItemPeople) => {
    let { avatar, firstName, lastName, nickname, online, lastOnlineTime, email } = data;

    return (
        <View>
            <TouchableWithoutFeedback
                style={style.main.people.itemPeople}
                onPress={() => {
                    Navigation.navigate('userInfo', { data: data });
                }}
            >
                <AvatarComponent
                    url={avatar}
                    online={{
                        status: online,
                        lastOnlineTime
                    }}
                    size="small"
                />
                <View style={style.main.people.itemPeopleWrap}>
                    <View style={style.main.people.itemPeopleInfo}>
                        <Text style={style.main.people.itemPeopleTitle}>{nickname ? nickname : `${lastName} ${firstName}`}</Text>
                        <Text style={style.main.people.itemPeopleInfoText}>{email}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default FindPeopleContainer;