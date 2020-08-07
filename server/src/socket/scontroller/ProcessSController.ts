import { AGServer, AGServerSocket } from "socketcluster-server";
import { User, UserFriend } from "../../database/ModelDatabase";
import common from "../../common";

/* __Distribute socket listener__ */
async function connection(agServer: AGServer, socket: AGServerSocket) {
    // Send friend update to friend when online
    if (socket.authToken?._id) {
        let user = await User.findById(socket.authToken?._id)
            .select(common.dbselect.user)
        if (!user) return;
        // Get all friend
        let socketIds = await UserFriend.find({ friend: socket.authToken?._id })
            .populate('user')
            .then(data => data.map(o => o.toObject()))
            .then(data => data.filter(o => o.user.online))
            .then(data => data.map(o => o.user.socketId))

        let sockets = socketIds.map(id => agServer.clients[id]);

        // Transmit
        sockets.forEach(sc => {
            sc.transmit(common.packet.FRIEND_UPDATE_DATA, user?.toObject(), undefined)
        })
    }
    // Send friend update to friend when offline
    socket.listener('disconnect').once().then(async () => {
        if (socket.authToken?._id) {
            let user = await User.findById(socket.authToken._id)
            if (user) {
                user.set('online', false);
                await user.save();

                // Get all friend
                let socketIds = await UserFriend.find({ friend: socket.authToken?._id })
                    .populate('user')
                    .then(data => data.map(o => o.toObject()))
                    .then(data => data.filter(o => o.user.online))
                    .then(data => data.map(o => o.user.socketId))

                let sockets = socketIds.map(id => agServer.clients[id]);

                // Transmit
                sockets.forEach(sc => {
                    sc.transmit(common.packet.FRIEND_UPDATE_DATA, user?.toObject(), undefined)
                })
            }
        }
    })
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