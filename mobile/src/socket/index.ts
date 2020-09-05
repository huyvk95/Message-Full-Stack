import socketClusterClient, { AGClientSocket } from "socketcluster-client";
import common from "../common";
import AsyncStorage from "@react-native-community/async-storage";

class Socket {
    /* __STATIC__ */
    static instance: Socket | undefined = undefined;
    static ins() {
        if (!this.instance) this.instance = new Socket();
        return this.instance;
    }

    /* __HANDLE__ */
    socket: AGClientSocket | undefined = undefined;

    getSocket() {
        return this.socket;
    }

    init(config: { deviceId: string }) {
        let { deviceId } = config;

        let socket = socketClusterClient.create({
            // hostname: common.config.HOST,
            // port: common.config.PORT,
            hostname: common.config.API,
            secure: true,
            port: 443,
            query: {
                deviceId: deviceId
            }
        });
        this.socket = socket;

        // Listener
        socket.listener('connect').once().then(async ({ id, isAuthenticated }) => {
            console.log('Socket', 'connect', id, isAuthenticated);

            try {
                // Token
                let token = await AsyncStorage.getItem('socketcluster.authToken');
                socket.transmit(common.packet.AUTH, { token })
            } catch (error) {
                console.error(error)
            }
        })

        socket.listener('disconnect').once().then(({ reason }) => {
            console.log('Socket', 'disconnect', reason)
            //Close all listener
            socket.closeAllChannels();
        })

        socket.listener('removeAuthToken').once().then(({ oldAuthToken }) => {
            console.log('Socket', 'removeAuthToken', oldAuthToken)
        })

        socket.listener('connecting').once().then(() => {
            console.log('Socket', 'connecting')
        })

        socket.listener('authStateChange').once().then((data) => {
            console.log('Socket', 'authStateChange')
        })

        socket.listener('authenticate').once().then(({ authToken, signedAuthToken }) => {
            console.log('Socket', 'authenticate', authToken, signedAuthToken)
        })

        socket.listener('deauthenticate').once().then(({ oldAuthToken, oldSignedAuthToken }) => {
            console.log('Socket', 'deauthenticate', oldAuthToken, oldSignedAuthToken)
        })

        socket.listener('error').once().then(({ error }) => {
            console.log('Socket', 'error', error)
        })

        socket.listener('connectAbort').once().then(({ code, reason }) => {
            console.log('Socket', 'connectAbort', code, reason)
        })

        socket.listener('subscribeStateChange').once().then(({ channel, newChannelState, oldChannelState, subscriptionOptions }) => {
            console.log('Socket', 'subscribeStateChange', channel, newChannelState, oldChannelState, subscriptionOptions)
        })

        socket.listener('subscribe').once().then(({ channel, subscriptionOptions }) => {
            console.log('Socket', 'subscribe', channel, subscriptionOptions)
        })

        socket.listener('subscribeFail').once().then(({ channel, error, subscriptionOptions }) => {
            console.log('Socket', 'subscribeFail', channel, error, subscriptionOptions)
        })

        socket.listener('unsubscribe').once().then(({ channel }) => {
            console.log('Socket', 'unsubscribe', channel)
        })

        socket.listener('kickOut').once().then(({ channel, message }) => {
            console.log('Socket', 'kickOut', channel, message)
        })
    }
}

const socket = Socket.ins();
export default socket;