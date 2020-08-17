import { AGServer, AGServerSocket } from "socketcluster-server";
import { User } from "../../database/ModelDatabase";
import common from "../../common";
import jwt from "jsonwebtoken";
import _ from "underscore";
import util from "../../util";

const PACKET = common.packet.AUTH;

/* __Distribute socket listener__ */
function connection(agServer: AGServer, socket: AGServerSocket) {
    (async () => {
        for await (let data of socket.receiver(PACKET)) {
            let { token } = data;
            let { deviceId } = socket as any;
            let userData: any = jwt.verify(token, process.env.SECRET_KEY as string)
            // Check input data
            if (!deviceId) return;
            // Get user data
            // -Token
            if (!userData) throw "error.token_expired"
            // -User 
            let user = await User.findById(userData._id);
            if (!user) throw "error.find_user"
            if (!user.get('emailVerify').verified) return
            // -Device
            let device = user.get('device');
            if (device[deviceId] != token) return
            // Save socket id
            let scIds = [...user.get('socketId')].filter(o => agServer.clients[o])
            user.set('socketId', [...scIds, socket.id])
            user.set('online', true);
            user.set('loginTime', new Date())
            await user.save()
            // Sign for socket
            socket.setAuthToken(util.common.userPrivateInfoFilter(user.toObject()))
        }
    })();
}

/* __Distribute server listener__ */
export default function controller(agServer: AGServer, socket: AGServerSocket, eventName: string) {
    switch (eventName) {
        case 'connection':
            return connection(agServer, socket)
        default:
            break;
    }
}