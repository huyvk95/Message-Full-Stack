import { UserFriend, User } from "../database/ModelDatabase";
import { AGServer, AGServerSocket } from "socketcluster-server";
import common from "../common";

async function transmitUserFriend(agServer: AGServer, socket: AGServerSocket, data: { id: string }) {
    let user = await User.findById(data.id)
        .select(common.dbselect.user)
    if (!user) return;
    // Get all friend
    let socketIds = await UserFriend.find({ friend: data.id })
        .populate('user')
        .then(data => data.map(o => o.toObject()))
        .then(data => data.map(o => o.user.socketId))

    let sockets = socketIds.map(id => agServer.clients[id]);

    // Transmit
    sockets.forEach(sc => {
        sc.transmit(common.transmit.FRIEND_DATA, user?.toObject(), undefined)
    })
}

const transmit = {
    transmitUserFriend
}

export default transmit;