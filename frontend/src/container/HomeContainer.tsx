/* LIBRARY */
import React, { Component } from "react";
import { connect } from "react-redux";
/* SCRIPT */
import socket from "../socket";
/* ACTION */
import { cleanUserData } from "../action/UserActions";
import { getFriend, updateFriendData } from "../action/FriendActions";
/* INTERFACE */
import { IStoreState, ISocketResponseData } from "../interface/DataInterface";
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
        let { app, cleanUserData } = this.props;
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

        // -FRIEND
        let { getFriend } = this.props;
        (async () => {
            for await (let data of sc.receiver(packet.FRIEND)) {
                let { evt, payload } = data as ISocketResponseData
                console.log(evt, payload)

                if (evt === event.FRIEND.GET) {
                    getFriend(payload)
                } else if (evt === event.FRIEND.SETNICKNAME) {

                } else if (evt === event.FRIEND.REMOVE) {

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

const mapStateToProps = ({ app }: IStoreState) => ({
    app
})

const mapDispatchToProps = {
    cleanUserData,
    getFriend,
    updateFriendData
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);