import { AGServer, AGServerSocket } from "socketcluster-server";
import { User, UserFriend } from "../../database/ModelDatabase";
import common from "../../common";
import _ from "underscore";

/* __Distribute socket listener__ */
async function connection(agServer: AGServer, socket: AGServerSocket) {
    // Send friend update to friend when online
    if (socket.authToken?._id) {
        let user = await User.findById(socket.authToken?._id)
            .select(common.dbselect.user)
        if (!user) return;
        // Get my socket
        let scIds = (user.get('socketId') as string[]).filter(o => agServer.clients[o])
        // If socket length is more than 1, not transmit
        if (scIds.length == 1) {
            // Get all friend
            let socketIds = await UserFriend.find({ friend: socket.authToken?._id })
                .populate('user')
                .then(data => data.map(o => o.toObject()))
                .then(data => data.filter(o => o.user.online))
                .then(data => _.flatten(data.map(o => o.user.socketId)))

            let sockets = _.compact(socketIds.map(id => agServer.clients[id]));

            // Transmit
            sockets.forEach(sc => {
                sc.transmit(common.packet.FRIEND_UPDATE_DATA, _.omit(user?.toObject(), "socketId"), undefined)
            })
        }
    }
    // Send friend update to friend when offline
    socket.listener('disconnect').once().then(async () => {
        if (socket.authToken?._id) {
            let user = await User.findById(socket.authToken._id)
                .select(common.dbselect.user)
            if (user) {
                let scIds = (user.get('socketId') as string[]).filter(o => agServer.clients[o])
                scIds = _.without(scIds, socket.id)
                user.set('socketId', scIds)
                user.set('lastOnlineTime', new Date())
                user.set('online', scIds.length ? true : false);
                await user.save();

                // Onlu transmit if sockets length is zero
                if (!scIds.length) {
                    // Get all friend
                    let socketIds = await UserFriend.find({ friend: socket.authToken?._id })
                        .populate('user')
                        .then(data => data.map(o => o.toObject()))
                        .then(data => data.filter(o => o.user.online))
                        .then(data => _.flatten(data.map(o => o.user.socketId)))

                    let sockets = _.compact(socketIds.map(id => agServer.clients[id]));

                    // Transmit
                    sockets.forEach(sc => {
                        sc.transmit(common.packet.FRIEND_UPDATE_DATA, _.omit(user?.toObject(),"socketId"), undefined)
                    })
                }
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