/* LIBRARY */
import React, { Component } from "react";
import { connect } from "react-redux";
/* SCRIPT */
import socket from "../socket";
/* ACTION */
import { pushToast } from "../action/AppActions";
import { cleanUserData } from "../action/UserActions";
import { receiveMessage, getMessages } from "../action/MessageActions";
import { getAllChatrooms, createChatroom, unfollowChatroom, updateChatroom } from "../action/ChatroomActions";
import { chooseContentTab, choosePeopleTab, setChatroomNavigation } from "../action/NavigationActions";
import { getFriend, setFriendNickName, updateFriendData, pushFriend, popFriend } from "../action/FriendActions";
import { getFriendRequest, popReceiveRequest, popSentRequest, pushReceiveRequest, pushSentRequest } from "../action/FriendRequestActions";
/* INTERFACE */
import { IStoreState, ISocketResponseData, ISocketTransmitData, IChatroomReducerData, IMessageData } from "../interface/DataInterface";
import { IHomeContainerProps } from "../interface/ComponentInterface";
/* COMPONENT */
import ContentChatComponent from "../component/ContentChatComponent";
import ContentHeaderComponent from "../component/ContentHeaderComponent";
import ContentFooterComponent from "../component/ContentFooterComponent";
import ContentBodyComponent from "../component/ContentBodyComponent";
import common from "../common";
import { ToastFriendRequestComponent, ToastFriendAcceptComponent } from "../component/ToastsComponent";
import { EContentTap, EPeopleTap, EViewType } from "../common/TypeCommon";
import util from "../util";
import { setTyping } from "../action/TypingAction";

let interval: NodeJS.Timeout | undefined = undefined
class HomeContainer extends Component<IHomeContainerProps> {
    constructor(props: IHomeContainerProps) {
        super(props);

        this.socketHandle = this.socketHandle.bind(this)
        this.getSocketData = this.getSocketData.bind(this)
    }

    UNSAFE_componentWillMount() {
        this.socketHandle();
    }

    componentDidMount() {
        this.getSocketData();
    }

    socketHandle() {
        let { app, user, navigation, cleanUserData } = this.props;
        let packet = common.packet;
        let event = common.event;

        /* __INIT__ */
        socket.init({ deviceId: app.deviceId });
        let sc = socket.getSocket();
        if (!sc) return;
        /* __LISTENER__ */
        sc.listener('disconnect').once().then(() => {
            cleanUserData()
        });

        /* __RECEIVE__ */
        let { updateFriendData } = this.props;
        (async () => {
            for await (let data of sc.receiver(packet.FRIEND_UPDATE_DATA)) {
                console.log(data)
                updateFriendData(data)
            }
        })();

        let { popReceiveRequest, popSentRequest, pushReceiveRequest, pushSentRequest, pushFriend, popFriend, pushToast, chooseContentTab, choosePeopleTab } = this.props;
        (async () => {
            for await (let data of sc.receiver(packet.FRIEND)) {
                let { evt, payload } = data as ISocketTransmitData
                console.log(evt, payload)
                if (evt === event.FRIEND.RECEIVEFRIENDREQUEST) { //Receive transmit from server
                    // Set on request
                    if (payload.from._id === user._id) pushSentRequest(payload)
                    else {
                        pushReceiveRequest(payload)
                        // Show toast
                        pushToast({
                            content: <ToastFriendRequestComponent data={payload} />,
                            time: new Date(),
                            onClick: () => {
                                chooseContentTab(EContentTap.PEOPLE)
                                choosePeopleTab(EPeopleTap.REQUEST)
                            },
                        })
                    }
                } else if (evt === event.FRIEND.REMOVEFRIENDREQUEST) { //Receive transmit from server
                    if (payload.from._id === user._id) popSentRequest(payload)
                    else popReceiveRequest(payload)
                } else if (evt === event.FRIEND.ONACCEPTFRIENDREQUEST) { //Receive transmit from server
                    // Push friend
                    pushFriend(payload)
                    // Toast
                    pushToast({
                        content: <ToastFriendAcceptComponent data={payload} />,
                        time: new Date(),
                    })
                } else if (evt === event.FRIEND.ONREMOVEFRIEND) { //Receive transmit from server
                    popFriend(payload)
                }
            }
        })();

        let { updateChatroom, setTyping } = this.props;
        (async () => {
            for await (let data of sc.receiver(packet.CHATROOM)) {
                let { evt, payload } = data as ISocketTransmitData
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

        let { receiveMessage } = this.props;
        (async () => {
            for await (let data of sc.receiver(packet.MESSAGE)) {
                let { evt, payload } = data as ISocketTransmitData
                console.log(evt, payload)

                if (evt === event.MESSAGE.RECEIVE) {
                    // Play audio
                    if (app.sound) {
                        let audio = new Audio('./src/mp3/message.mp3')
                        audio.play()
                    }
                    // Add message
                    receiveMessage(payload)
                }
            }
        })();

        /* __HANDLE__ */
        // -FRIEND
        let { getFriend, setFriendNickName, getFriendRequest } = this.props;
        (async () => {
            for await (let data of sc.receiver(packet.FRIEND)) {
                let { evt, payload } = data as ISocketResponseData
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
        let { getAllChatrooms, createChatroom, unfollowChatroom, setChatroomNavigation } = this.props;
        (async () => {
            for await (let data of sc.receiver(packet.CHATROOM)) {
                let { evt, payload } = data as ISocketResponseData
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
        let { getMessages } = this.props;
        (async () => {
            for await (let data of sc.receiver(packet.MESSAGE)) {
                let { evt, payload } = data as ISocketResponseData
                console.log(evt, payload)

                if (evt === event.MESSAGE.GET) {
                    getMessages(payload)
                }
            }
        })();
    }

    getSocketData() {
        let packet = common.packet;
        let event = common.event;
        let sc = socket.getSocket();
        if (!sc) return;

        sc.transmit(packet.FRIEND, { evt: event.FRIEND.GET })
        sc.transmit(packet.FRIEND, { evt: event.FRIEND.GETFRIENDREQUEST })
        sc.transmit(packet.CHATROOM, { evt: event.CHATROOM.GETALLUSERCHATROOMS })
    }

    render() {
        let { app, navigation } = this.props;
        // Change tabview
        if (interval) {
            clearTimeout(interval);
            interval = undefined;
        }
        if (app.unreadChatroom) {
            // Fav icon
            util.common.changeFAVIcon('./src/images/icon-noti.svg')
            // Change title
            interval = setInterval(() => {
                document.title = document.title !== common.config.APP_NAME ? common.config.APP_NAME : "You have received a new message";
            }, 1000)
        } else {
            // Fav icon
            util.common.changeFAVIcon('./src/images/icon.svg')
            // Change title
            document.title = common.config.APP_NAME;
        }

        // Render
        return (
            <div className="home">
                {
                    app.viewType === EViewType.MOBILE ?
                        <>
                            {
                                navigation.chatroom ?
                                    <ContentChatComponent />
                                    :
                                    <div className="content">
                                        <ContentHeaderComponent />
                                        <ContentBodyComponent />
                                        <ContentFooterComponent />
                                    </div>
                            }
                        </>
                        :
                        <>
                            <div className="content">
                                <ContentHeaderComponent />
                                <ContentBodyComponent />
                                <ContentFooterComponent />
                            </div>
                            <ContentChatComponent />
                        </>
                }
            </div>
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
    pushToast,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);