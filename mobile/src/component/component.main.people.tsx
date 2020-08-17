import React from "react";
import { View, Text } from "react-native";
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
    const data: any[] = navigation.peopleTab === common.type.EPeopleTap.PEOPLE ? friendData : requestData;
    // Render function
    const renderItem = ({ item }: { item: any }) => {
        if (navigation.peopleTab === common.type.EPeopleTap.PEOPLE)
            return (<ItemPeople data={item} />)
        else if (navigation.peopleTab === common.type.EPeopleTap.REQUEST)
            return (<ItemRequest data={item} />)
        else
            return (<View></View>)
    }

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
                            Friends
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
                            Request
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => {
                    if (navigation.peopleTab === common.type.EPeopleTap.PEOPLE)
                        return (item as IFriendData)._id
                    else
                        return (item as IFriendRequest)._id
                }}
                style={style.main.people.list}
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