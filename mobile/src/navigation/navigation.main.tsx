import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { IStoreState, ISocketTransmitData, IChatroomReducerData, ISocketResponseData } from '../interface/interface.data';
import { cleanUserData } from '../action/action.user';
import { getFriend, setFriendNickName, updateFriendData, pushFriend, popFriend } from '../action/action.friend';
import { getFriendRequest, popReceiveRequest, popSentRequest, pushReceiveRequest, pushSentRequest } from '../action/action.friendrequest';
import { chooseContentTab, choosePeopleTab, setChatroomNavigation } from '../action/action.navigation';
import { getAllChatrooms, createChatroom, unfollowChatroom, updateChatroom } from '../action/action.chatroom';
import { receiveMessage, getMessages } from '../action/action.message';
import { setTyping } from '../action/action.typing';
import { IMainNavigationProps } from '../interface/interface.component';
import { EViewType } from '../common/common.type';
import style from '../style';
import common from '../common';
import socket from '../socket';
import UserProfileContainer from '../container/container.profile';
import UserInfoContainer from '../container/container.userInfo';
import MainContainer from '../container/container.main';
import MessageContainer from '../container/container.message';
import FindPeopleContainer from '../container/container.findpeople';

const Stack = createStackNavigator();
class MainNavigation extends React.Component<IMainNavigationProps> {
    constructor(props: IMainNavigationProps) {
        super(props);
        this.socketHandle = this.socketHandle.bind(this)
    }

    UNSAFE_componentWillMount() {
        this.socketHandle();
    }

    socketHandle() {
        let props = this.props;
        let { app, user, navigation, cleanUserData } = props;
        let packet = common.packet;
        let event = common.event;

        /* __INIT__ */
        socket.init({ deviceId: app.deviceId });
        let sc = socket.getSocket();
        if (!sc) return;
        /* __LISTENER__ */
        sc.listener('authenticate').once().then(({ authToken, signedAuthToken }) => {
            let sc = socket.getSocket();
            if (!sc) return;
            sc.transmit(packet.FRIEND, { evt: event.FRIEND.GET })
            sc.transmit(packet.FRIEND, { evt: event.FRIEND.GETFRIENDREQUEST })
            sc.transmit(packet.CHATROOM, { evt: event.CHATROOM.GETALLUSERCHATROOMS })
        })
        sc.listener('disconnect').once().then(() => {
            cleanUserData()
        });

        /* __RECEIVE__ */
        let { updateFriendData } = props;
        (async () => {
            let data = await sc.receiver(packet.FRIEND);
            const iterator = data[Symbol.asyncIterator]();
            const result = [];
            while (result.length < Infinity) {
                const { value, done } = await iterator.next();
                if (done) break;
                result.push(value);

                console.log(value)
                updateFriendData(value)
            }
        })();

        let { popReceiveRequest, popSentRequest, pushReceiveRequest, pushSentRequest, pushFriend, popFriend, chooseContentTab, choosePeopleTab } = props;
        (async () => {
            let data = await sc.receiver(packet.FRIEND);
            const iterator = data[Symbol.asyncIterator]();
            const result = [];
            while (result.length < Infinity) {
                const { value, done } = await iterator.next();
                if (done) break;
                result.push(value);

                let { evt, payload } = value as ISocketTransmitData
                console.log(evt, payload)
                if (evt === event.FRIEND.RECEIVEFRIENDREQUEST) { //Receive transmit from server
                    // Set on request
                    if (payload.from._id === user._id) pushSentRequest(payload)
                    else {
                        pushReceiveRequest(payload)
                    }
                } else if (evt === event.FRIEND.REMOVEFRIENDREQUEST) { //Receive transmit from server
                    if (payload.from._id === user._id) popSentRequest(payload)
                    else popReceiveRequest(payload)
                } else if (evt === event.FRIEND.ONACCEPTFRIENDREQUEST) { //Receive transmit from server
                    // Push friend
                    pushFriend(payload)
                } else if (evt === event.FRIEND.ONREMOVEFRIEND) { //Receive transmit from server
                    popFriend(payload)
                }
            }
        })();

        let { updateChatroom, setTyping } = props;
        (async () => {
            let data = await sc.receiver(packet.CHATROOM);
            const iterator = data[Symbol.asyncIterator]();
            const result = [];
            while (result.length < Infinity) {
                const { value, done } = await iterator.next();
                if (done) break;
                result.push(value);

                let { evt, payload } = value as ISocketTransmitData
                console.log(evt, payload)

                if (evt === event.CHATROOM.UPDATE) {
                    // Navigator
                    if (app.viewType !== EViewType.MOBILE && !navigation.chatroom) {
                        setChatroomNavigation((payload as IChatroomReducerData).chatroom._id)
                    }
                    // Update chatroom
                    updateChatroom(payload)
                } else if (evt === event.CHATROOM.SEND_TYPING) {
                    setTyping(payload)
                }
            }
        })();

        let { receiveMessage } = props;
        (async () => {
            let data = await sc.receiver(packet.MESSAGE);
            const iterator = data[Symbol.asyncIterator]();
            const result = [];
            while (result.length < Infinity) {
                const { value, done } = await iterator.next();
                if (done) break;
                result.push(value);

                let { evt, payload } = value as ISocketTransmitData
                console.log(evt, payload)

                if (evt === event.MESSAGE.RECEIVE) {
                    // // Play audio
                    // if (app.sound) {
                    //     let audio = new Audio('./src/mp3/message.mp3')
                    //     audio.play()
                    // }
                    // Add message
                    receiveMessage(payload)
                }
            }
        })();

        /* __HANDLE__ */
        // -FRIEND
        let { getFriend, setFriendNickName, getFriendRequest } = props;
        (async () => {
            let data = await sc.receiver(packet.FRIEND);
            const iterator = data[Symbol.asyncIterator]();
            const result = [];
            while (result.length < Infinity) {
                const { value, done } = await iterator.next();
                if (done) break;
                result.push(value);

                let { evt, payload } = value as ISocketResponseData
                console.log(evt, payload)

                if (evt === event.FRIEND.GET) {
                    getFriend(payload)
                } else if (evt === event.FRIEND.SETNICKNAME) {
                    setFriendNickName(payload)
                } else if (evt === event.FRIEND.REMOVE) {

                } else if (evt === event.FRIEND.GETFRIENDREQUEST) {
                    getFriendRequest(payload)
                } else if (evt === event.FRIEND.SENDFRIENDREQUEST) {

                } else if (evt === event.FRIEND.ACCEPTFRIENDREQUEST) {

                } else if (evt === event.FRIEND.REFUSEFRIENDREQUEST) {

                } else if (evt === event.FRIEND.CANCELFRIENDREQUEST) {

                }
            }
        })();

        // -CHAT_ROOM
        let { getAllChatrooms, createChatroom, unfollowChatroom, setChatroomNavigation } = props;
        (async () => {
            let data = await sc.receiver(packet.CHATROOM);
            const iterator = data[Symbol.asyncIterator]();
            const result = [];
            while (result.length < Infinity) {
                const { value, done } = await iterator.next();
                if (done) break;
                result.push(value);

                let { evt, payload } = value as ISocketResponseData
                console.log(evt, payload)

                if (evt === event.CHATROOM.CREATE) {
                    createChatroom(payload)
                } else if (evt === event.CHATROOM.UNFOLLOW) {
                    unfollowChatroom(payload)
                } else if (evt === event.CHATROOM.INVITE) {

                } else if (evt === event.CHATROOM.GETALLUSERCHATROOMS) {
                    getAllChatrooms(payload)
                    if (payload.data && payload.data.length && app.viewType === EViewType.WINDOW)
                        setChatroomNavigation((payload.data as IChatroomReducerData[])[0].chatroom._id)
                }
            }
        })();

        // -MESSAGE
        let { getMessages } = props;
        (async () => {
            let data = await sc.receiver(packet.MESSAGE);
            const iterator = data[Symbol.asyncIterator]();
            const result = [];
            while (result.length < Infinity) {
                const { value, done } = await iterator.next();
                if (done) break;
                result.push(value);

                let { evt, payload } = value as ISocketResponseData
                console.log(evt, payload)

                if (evt === event.MESSAGE.GET) {
                    getMessages(payload)
                }
            }
        })();
    }

    render() {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: style.app.card
                }}
                initialRouteName="main"
            >
                <Stack.Screen
                    name="main"
                    component={MainContainer}
                />
                <Stack.Screen
                    name="message"
                    component={MessageContainer}
                />
                <Stack.Screen
                    name="userInfo"
                    component={UserInfoContainer}
                />
                <Stack.Screen
                    name="profile"
                    component={UserProfileContainer}
                />
                <Stack.Screen
                    name="findPeople"
                    component={FindPeopleContainer}
                />
            </Stack.Navigator>
        )
    }
}

const mapStateToProps = ({ app, user, navigation }: IStoreState) => ({
    app,
    user,
    navigation
})

const mapDispatchToProps = {
    cleanUserData,
    getFriend,
    setFriendNickName,
    updateFriendData,
    getFriendRequest,
    popReceiveRequest,
    popSentRequest,
    pushReceiveRequest,
    pushSentRequest,
    pushFriend,
    popFriend,
    chooseContentTab,
    choosePeopleTab,
    getAllChatrooms,
    createChatroom,
    unfollowChatroom,
    updateChatroom,
    receiveMessage,
    getMessages,
    setChatroomNavigation,
    setTyping
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);