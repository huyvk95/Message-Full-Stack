import { AGServer } from "socketcluster-server";
import { User } from "../database/ModelDatabase";

export default function socketMiddleware(agServer: AGServer) {
    agServer.setMiddleware(agServer.MIDDLEWARE_INBOUND, async (middlewareStream) => {
        console.log('Middleware MIDDLEWARE_INBOUND');
        for await (let action of middlewareStream) {
            try {
                if (action.type === action.AUTHENTICATE) {
                    let { socket, authToken: userData, signedAuthToken } = action;
                    let { deviceId } = socket;
                    // Check input data
                    if (!deviceId) throw 'validate.missing_input'
                    // Get user data
                    // -Token
                    if (!userData) throw "error.token_expired"
                    // -User 
                    let user = await User.findById(userData._id);
                    if (!user) throw "error.find_user"
                    if (!user.get('emailVerify').verified) throw "user.user_verify"
                    // -Device
                    let device = user.get('device');
                    if (device[deviceId] != signedAuthToken) throw "error.auth"
                    // Save socket id
                    user.set('socketId', action.socket.id)
                    user.set('online', true);
                    user.set('loginTime', new Date())
                    await user.save()

                    action.allow()
                } else {
                    action.allow()
                }
            } catch (error) {
                action.block(error)
            }
        }
    })
    agServer.setMiddleware(agServer.MIDDLEWARE_HANDSHAKE, async (middlewareStream) => {
        console.log('Middleware MIDDLEWARE_HANDSHAKE');
        for await (let action of middlewareStream) {
            action.allow();
        }
    })
    agServer.setMiddleware(agServer.MIDDLEWARE_INBOUND_RAW, async (middlewareStream) => {
        console.log('Middleware MIDDLEWARE_INBOUND_RAW');
        for await (let action of middlewareStream) {
            let { socket } = action;
            if (!action.socket.deviceId) {
                let queries: { [key in string]: string } = (socket.request.url.match(/(\?)(.+)/)[2].split("&") as Array<String>).map(o => o.split('=')).reduce((r, o) => Object.assign(r, { [o[0]]: o[1] }), {})
                socket.deviceId = queries.deviceId;
            }
            action.allow();
        }
    })
    agServer.setMiddleware(agServer.MIDDLEWARE_OUTBOUND, async (middlewareStream) => {
        console.log('Middleware MIDDLEWARE_OUTBOUND');
        for await (let action of middlewareStream) {
            action.allow();
        }
    })
}