/* LIBRARY */
import React, { Component } from "react";
import { connect } from "react-redux";
/* SCRIPT */
import socket from "../socket";
/* ACTION */
import { cleanUserData } from "../action/UserActions";
import { getFriend, setFriendNickName, updateFriendData } from "../action/FriendActions";
import { getFriendRequest, popReceiveRequest, popSentRequest, pushReceiveRequest, pushSentRequest } from "../action/FriendRequestActions";
/* INTERFACE */
import { IStoreState, ISocketResponseData, ISocketTransmitData } from "../interface/DataInterface";
import { IHomeContainerProps } from "../interface/ComponentInterface";
/* COMPONENT */
import ContentChatComponent from "../component/ContentChatComponent";
import ContentHeaderComponent from "../component/ContentHeaderComponent";
import ContentFooterComponent from "../component/ContentFooterComponent";
import ContentBodyComponent from "../component/ContentBodyComponent";
import common from "../common";

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
        let { app, user, cleanUserData } = this.props;
        let packet = common.packet;
        let event = common.event;

        // Init socket
        socket.init({ deviceId: app.deviceId });
        let sc = socket.getSocket();
        if (!sc) return;
        // Listener
        sc.listener('disconnect').once().then(() => {
            cleanUserData()
        });

        // Receiver
        let { updateFriendData } = this.props;
        (async () => {
            for await (let data of sc.receiver(packet.FRIEND_UPDATE_DATA)) {
                console.log(data)
                updateFriendData(data)
            }
        })();
        let { popReceiveRequest, popSentRequest, pushReceiveRequest, pushSentRequest } = this.props;
        (async () => {
            for await (let data of sc.receiver(packet.FRIEND)) {
                let { evt, payload } = data as ISocketTransmitData
                console.log(evt, payload)
                if (evt === event.FRIEND.RECEIVEFRIENDREQUEST) { //Receive transmit from server
                    if (payload.from._id === user._id) pushSentRequest(payload)
                    else pushReceiveRequest(payload)
                } else if (evt === event.FRIEND.REMOVEFRIENDREQUEST) { //Receive transmit from server
                    if (payload.from._id === user._id) popSentRequest(payload)
                    else popReceiveRequest(payload)
                }
            }
        })();

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
    }

    getSocketData() {
        let packet = common.packet;
        let event = common.event;
        let sc = socket.getSocket();
        if (!sc) return;

        sc.transmit(packet.FRIEND, { evt: event.FRIEND.GET })
        sc.transmit(packet.FRIEND, { evt: event.FRIEND.GETFRIENDREQUEST })
    }

    render() {
        return (
            <div className="home">
                <div className="content">
                    <ContentHeaderComponent />
                    <ContentBodyComponent />
                    <ContentFooterComponent />
                </div>
                <ContentChatComponent />
            </div>
        )
    }
}

const mapStateToProps = ({ app, user }: IStoreState) => ({
    app,
    user
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
    pushSentRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);