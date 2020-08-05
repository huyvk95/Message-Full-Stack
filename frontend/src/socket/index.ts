import socketClusterClient, { AGClientSocket } from "socketcluster-client";
import common from "../common";
import { IAuthData } from "../interface/DataInterface";

class Socket {
    /* __STATIC__ */
    static instance: Socket | undefined = undefined;
    static ins() {
        if (!this.instance) this.instance = new Socket();
        return this.instance;
    }

    /* __HANDLE__ */
    socket: AGClientSocket | undefined = undefined;

    init(config: { deviceId: string }) {
        let { deviceId } = config;

        let socket = socketClusterClient.create({
            hostname: common.config.HOST,
            port: common.config.PORT,
            query: {
                deviceId: deviceId
            }
        });
        this.socket = socket;
        (window as any)['socket'] = this;

        // Listener
        socket.listener('connect').once().then(({ id, isAuthenticated }) => {
            console.log('%cSocket', 'color: #2e7d32', 'connect', id, isAuthenticated);

            (async () => {
                for await (let data of socket.receiver(common.transmit.FRIEND_DATA)) {
                    console.log(data)
                }
            })()
        })

        socket.listener('disconnect').once().then(({ reason }) => {
            console.log('%cSocket', 'color: #2e7d32', 'disconnect', reason)
            //Close all listener
            socket.closeAllChannels();
        })

        socket.listener('removeAuthToken').once().then(({ oldAuthToken }) => {
            console.log('%cSocket', 'color: #2e7d32', 'removeAuthToken', oldAuthToken)
        })

        socket.listener('connecting').once().then(() => {
            console.log('%cSocket', 'color: #2e7d32', 'connecting')
        })

        socket.listener('authStateChange').once().then((data) => {
            console.log('%cSocket', 'color: #2e7d32', 'authStateChange')
        })

        socket.listener('authenticate').once().then(({ authToken, signedAuthToken }) => {
            console.log('%cSocket', 'color: #2e7d32', 'authenticate', authToken, signedAuthToken)
        })

        socket.listener('deauthenticate').once().then(({ oldAuthToken, oldSignedAuthToken }) => {
            console.log('%cSocket', 'color: #2e7d32', 'deauthenticate', oldAuthToken, oldSignedAuthToken)
        })

        socket.listener('error').once().then(({ error }) => {
            console.log('%cSocket', 'color: #2e7d32', 'error', error)
        })

        socket.listener('connectAbort').once().then(({ code, reason }) => {
            console.log('%cSocket', 'color: #2e7d32', 'connectAbort', code, reason)
        })

        socket.listener('subscribeStateChange').once().then(({ channel, newChannelState, oldChannelState, subscriptionOptions }) => {
            console.log('%cSocket', 'color: #2e7d32', 'subscribeStateChange', channel, newChannelState, oldChannelState, subscriptionOptions)
        })

        socket.listener('subscribe').once().then(({ channel, subscriptionOptions }) => {
            console.log('%cSocket', 'color: #2e7d32', 'subscribe', channel, subscriptionOptions)
        })

        socket.listener('subscribeFail').once().then(({ channel, error, subscriptionOptions }) => {
            console.log('%cSocket', 'color: #2e7d32', 'subscribeFail', channel, error, subscriptionOptions)
        })

        socket.listener('unsubscribe').once().then(({ channel }) => {
            console.log('%cSocket', 'color: #2e7d32', 'unsubscribe', channel)
        })

        socket.listener('kickOut').once().then(({ channel, message }) => {
            console.log('%cSocket', 'color: #2e7d32', 'kickOut', channel, message)
        })
    }
}

const socket = Socket.ins();
export default socket;