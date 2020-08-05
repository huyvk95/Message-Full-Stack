import { AGServer, AGServerSocket } from "socketcluster-server";
import { User } from "../../database/ModelDatabase";
import transmit from "../SocketTransmit";

/* __Distribute socket listener__ */
function connection(agServer: AGServer, socket: AGServerSocket) {
    // Connect handle
    if (socket.authToken?._id) {
        transmit.transmitUserFriend(agServer, socket, { id: socket.authToken?._id })
    }
    // Disconnect handle
    socket.listener('disconnect').once().then(async () => {
        if (socket.authToken?._id) {
            let user = await User.findById(socket.authToken._id)
            if (user) {
                user.set('online', false);
                await user.save();
                await transmit.transmitUserFriend(agServer, socket, { id: socket.authToken._id })
            }
        }
    })
}

/* __Distribute server listener__ */
export default function userSController(agServer: AGServer, socket: AGServerSocket, eventName: string) {
    switch (eventName) {
        case 'connection':
            return connection(agServer, socket)
        default:
            break;
    }
}