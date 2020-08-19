import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, FlatList, TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import { IStoreState, IFriendData, IFriendRequest } from "../interface/interface.data";
import { IMainPeople, IItemPeople } from "../interface/interface.component";
import { choosePeopleTab } from "../action/action.navigation";
import { EPeopleTap } from "../common/common.type";
import { connect } from "react-redux";
import style from "../style";
import AvatarComponent from "./component.avatar";
import common from "../common";
import socket from "../socket";
import * as Navigation from "../navigation";

const MainPeople = ({ navigation, choosePeopleTab, friend, friendRequest }: IMainPeople) => {
    // Data
    let friendData = [...friend.filter(o => o.online), ...friend.filter(o => !o.online)]
    let requestData = friendRequest.receive;

    return (
        <View style={{ backgroundColor: "#fff" }}>
            <View
                style={style.main.people.tabGroup}
            >
                <View style={style.main.people.tab}>
                    <TouchableWithoutFeedback
                        style={style.main.people.tabContent}
                        onPress={() => { choosePeopleTab(EPeopleTap.PEOPLE) }}
                    >
                        <Text
                            style={navigation.peopleTab === common.type.EPeopleTap.PEOPLE ? style.main.people.tabTitleActive : style.main.people.tabTitle}
                        >
                            {`Friends${!friendData.length ? "" : ` (${friendData.length})`}`}
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={style.main.people.tab}>
                    <TouchableWithoutFeedback
                        style={style.main.people.tabContent}
                        onPress={() => { choosePeopleTab(EPeopleTap.REQUEST) }}
                    >
                        <Text
                            style={navigation.peopleTab === common.type.EPeopleTap.REQUEST ? style.main.people.tabTitleActive : style.main.people.tabTitle}
                        >
                            {`Request${!requestData.length ? "" : ` (${requestData.length})`}`}
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <FlatList
                data={friendData}
                renderItem={({ item }: { item: any }) => (<ItemPeople data={item} />)}
                keyExtractor={item => item._id}
                style={StyleSheet.flatten([
                    style.main.people.list,
                    { display: navigation.peopleTab === common.type.EPeopleTap.PEOPLE ? "flex" : "none" }
                ])}
            />
            <FlatList
                data={requestData}
                renderItem={({ item }: { item: any }) => (<ItemRequest data={item} />)}
                keyExtractor={item => item._id + item.from._id}
                style={StyleSheet.flatten([
                    style.main.people.list,
                    { display: navigation.peopleTab === common.type.EPeopleTap.REQUEST ? "flex" : "none" }
                ])}
            />

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

const ItemRequest = ({ data }: { data: IFriendRequest }) => {
    let { from, _id } = data;
    let { avatar, firstName, lastName, email } = from

    const onRefuseClick = () => {
        let sc = socket.getSocket()
        if (!sc) return;
        sc.transmit(common.packet.FRIEND, { evt: common.event.FRIEND.REFUSEFRIENDREQUEST, data: { requestId: _id } })
    }

    const onAccepClick = () => {
        let sc = socket.getSocket()
        if (!sc) return;
        sc.transmit(common.packet.FRIEND, { evt: common.event.FRIEND.ACCEPTFRIENDREQUEST, data: { requestId: _id } })
    }

    const onClickItem = () => {
        Navigation.navigate('userInfo', { data: from });
    }

    return (
        <View>
            <TouchableWithoutFeedback
                style={style.main.people.itemPeople}
                onPress={onClickItem}
            >
                <AvatarComponent
                    url={avatar}
                    size="small"
                />
                <View style={style.main.people.itemPeopleWrap}>
                    <View style={style.main.people.itemPeopleInfo}>
                        <Text style={style.main.people.itemPeopleTitle}>{`${lastName} ${firstName}`}</Text>
                        <Text style={style.main.people.itemPeopleInfoText}>{email}</Text>
                    </View>
                    <View style={style.main.people.itemPeopleControl}>
                        <TouchableOpacity
                            style={style.main.people.itemPeopleButton}
                            onPress={onRefuseClick}
                        >
                            <Text style={style.main.people.itemPeopleButtonText}>Refuse</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.main.people.itemPeopleButton}
                            onPress={onAccepClick}
                        >
                            <Text style={style.main.people.itemPeopleButtonTextActive}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

let mapStateToProps = ({ navigation, friend, user, friendRequest }: IStoreState) => ({
    navigation,
    friend,
    user,
    friendRequest
})
let mapDispatchToProps = {
    choosePeopleTab
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPeople);