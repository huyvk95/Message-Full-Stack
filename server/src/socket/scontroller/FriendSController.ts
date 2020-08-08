import { AGServer, AGServerSocket } from "socketcluster-server";
import { User, UserFriend, FriendRequest } from "../../database/ModelDatabase";
import common from "../../common";
import _ from "underscore";

const PACKET = common.packet.FRIEND;
const EVENT = common.event.FRIEND;

/* __Handle__ */
async function get(socket: AGServerSocket, data: any) {
    try {
        data = data || {}
        let { online, string } = data
        // Get data
        let friendData = await UserFriend.find({ user: socket.authToken?._id })
            .populate({
                path: 'friend',
                select: common.dbselect.user,
            })
            .limit(50)
            .then((data) => {
                //Get friend
                data = data.map(o => Object.assign({}, o.get('friend').toObject(), { nickname: o.get('nickname') }))
                //Filter
                data = data.filter((o: any) => o['active'] === true)
                if (online || string) {
                    if (online) data = data.filter((o: any) => o['online'] === online);
                    if (string) data = data.filter((o: any) => {
                        return new RegExp(`.*${string}.`).test(o['email']) || new RegExp(`.*${string}.`).test(o['firstName']) || new RegExp(`.*${string}.`).test(o['lastName'])
                    });
                }
                return data
            })

        send(socket, {
            evt: EVENT.GET,
            payload: {
                success: true,
                data: friendData,
            }
        })
    } catch (error) {
        send(socket, {
            evt: EVENT.GET,
            payload: {
                success: false,
                message: error
            }
        })
    }

}

async function setNickName(socket: AGServerSocket, data: any) {
    try {
        let { friendId, nickname } = data
        if (!friendId || typeof nickname !== 'string') throw "validate.missing_input";
        // Get friend data
        let friendData = await UserFriend.findOne({ friend: friendId, user: socket.authToken?._id })
            .populate({
                path: 'friend',
                select: common.dbselect.user,
            })
        if (!friendData) throw "error.not_friend";
        // Set nick name
        friendData.set('nickname', nickname);
        await friendData.save()
        // Response
        send(socket, {
            evt: EVENT.SETNICKNAME,
            payload: {
                success: true,
                message: "success.success",
                data: {
                    friendId,
                    nickname
                },
            }
        })
    } catch (error) {
        send(socket, {
            evt: EVENT.SETNICKNAME,
            payload: {
                success: false,
                message: error
            }
        })
    }
}

async function remove(agServer: AGServer, socket: AGServerSocket, data: any) {
    try {
        let { friendId } = data
        if (!friendId) throw 'validate.missing_input';
        // Get mine friend data
        let friendData = await UserFriend.findOne({ friend: friendId, user: socket.authToken?._id })
        if (!friendData) throw 'error.not_friend';
        // Get friend and mine
        let friend = await User.findOne({ _id: friendData.get('friend'), active: true })
            .select(common.dbselect.user)
        if (!friend) throw 'error.find_user';
        let user = await User.findOne({ _id: socket.authToken?._id, active: true })
            .select(common.dbselect.user)
        if (!user) throw 'error.find_user';
        // Get your friend data
        let yourFriendData = await UserFriend.findOne({ user: friendData.get('friend'), friend: socket.authToken?._id })
        // Remove
        await friendData.remove();
        if (yourFriendData) await yourFriendData.remove();
        // Response
        send(socket, {
            evt: EVENT.REMOVE,
            payload: {
                success: true,
                message: "success.success",
            }
        })
        // Transmit
        let isockets: AGServerSocket[] = _.compact(user.get("socketId").map((o: string) => agServer.clients[o]))
        let fsockets: AGServerSocket[] = _.compact(friend.get("socketId").map((o: string) => agServer.clients[o]))
        // -New friend data
        if (isockets) isockets.forEach(o => o.transmit(PACKET, {
            evt: EVENT.ONREMOVEFRIEND,
            payload: _.omit(friend?.toObject(), "socketId")
        }, {}))
        if (fsockets) fsockets.forEach(o => {
            o.transmit(PACKET, {
                evt: EVENT.ONREMOVEFRIEND,
                payload: _.omit(user?.toObject(), "socketId")
            }, {})
        })
    } catch (error) {
        send(socket, {
            evt: EVENT.REMOVE,
            payload: {
                success: false,
                message: error
            }
        })
    }
}

async function getFriendRequest(socket: AGServerSocket) {
    try {
        // Check request
        let friendRequestReceive = await FriendRequest.find({ to: socket.authToken?._id })
            .populate({
                path: 'from',
                select: common.dbselect.user,
            })
            .populate({
                path: 'to',
                select: common.dbselect.user,
            })
        let friendRequestSent = await FriendRequest.find({ from: socket.authToken?._id })
            .populate({
                path: 'from',
                select: common.dbselect.user,
            })
            .populate({
                path: 'to',
                select: common.dbselect.user,
            })
        // Response
        send(socket, {
            evt: EVENT.GETFRIENDREQUEST,
            payload: {
                success: true,
                message: "success.success",
                data: {
                    receive: friendRequestReceive.map(o => o.toObject()),
                    sent: friendRequestSent.map(o => o.toObject())
                }
            }
        })
    } catch (error) {
        send(socket, {
            evt: EVENT.GETFRIENDREQUEST,
            payload: {
                success: false,
                message: error
            }
        })
    }
}

async function sendFriendRequest(agServer: AGServer, socket: AGServerSocket, data: any) {
    try {
        let { userId } = data
        if (!userId) throw 'validate.missing_input';
        if (userId === socket.authToken?._id) throw 'error.bad';
        // Check request
        let friendRequest = await FriendRequest.findOne({ from: socket.authToken?._id, to: userId })
            .populate({
                path: 'from',
                select: common.dbselect.user,
            })
            .populate({
                path: 'to',
                select: common.dbselect.user,
            })
        if (friendRequest) throw 'error.have_send_request';
        // Check user exist
        let friend = await User.findOne({ _id: userId, active: true });
        if (!friend) throw 'error.find_user';
        let user = await User.findById(socket.authToken?._id);
        if (!user) throw 'error.find_user';
        // Check friend exist
        let friendData = await UserFriend.findOne({ user: socket.authToken?._id, friend: userId })
        if (friendData) throw 'error.been_friend';
        // Create friend request
        friendRequest = new FriendRequest({ from: socket.authToken?._id, to: userId })
        await friendRequest.save()
        await friendRequest
            .populate({
                path: 'from',
                select: common.dbselect.user,
            })
            .populate({
                path: 'to',
                select: common.dbselect.user,
            })
            .execPopulate()
        // Response
        send(socket, {
            evt: EVENT.SENDFRIENDREQUEST,
            payload: {
                success: true,
                message: "success.success",
                data: friendRequest.toObject()
            }
        })
        // Transmit
        let transData = {
            evt: EVENT.RECEIVEFRIENDREQUEST,
            payload: _.omit(friendRequest.toObject(), "socketId")
        }
        // -Mine
        let isockets: AGServerSocket[] = _.compact(user.get("socketId").map((o: string) => agServer.clients[o]))
        if (isockets) isockets.forEach(o => o.transmit(PACKET, transData, {}))
        // -Friend
        let fsockets: AGServerSocket[] = _.compact(friend.get("socketId").map((o: string) => agServer.clients[o]))
        if (fsockets) fsockets.forEach(o => o.transmit(PACKET, transData, {}))
    } catch (error) {
        send(socket, {
            evt: EVENT.SENDFRIENDREQUEST,
            payload: {
                success: false,
                message: error
            }
        })
    }
}

async function acceptFriendRequest(agServer: AGServer, socket: AGServerSocket, data: any) {
    try {
        let { requestId } = data
        if (!requestId) throw 'validate.missing_input';
        // Get request
        let requestData = await FriendRequest.findOne({ _id: requestId, to: socket.authToken?._id })
            .populate({
                path: 'from',
                select: common.dbselect.user,
            })
            .populate({
                path: 'to',
                select: common.dbselect.user,
            })
        if (!requestData) throw 'error.bad';
        // Check friend exist
        let friend = await User.findOne({ _id: requestData.get('from').get('_id'), active: true })
            .select(common.dbselect.user)
        if (!friend) throw 'error.find_user';
        // Check mine exist
        let user = await User.findOne({ _id: socket.authToken?._id, active: true })
            .select(common.dbselect.user)
        if (!user) throw 'error.find_user';
        // Create friend 2 side
        // -Mine
        let friendMine = await UserFriend.findOne({ user: socket.authToken?._id, friend: requestData.get('from').get('_id') })
        if (friendMine) throw 'error.been_friend';
        friendMine = new UserFriend({ user: socket.authToken?._id, friend: requestData.get('from').get('_id') })
        await friendMine.save()
        // -You
        let friendYour = await UserFriend.findOne({ user: requestData.get('from').get('_id'), friend: socket.authToken?._id })
        if (friendYour) throw 'error.been_friend';
        friendYour = new UserFriend({ user: requestData.get('from').get('_id'), friend: socket.authToken?._id })
        await friendYour.save()
        // Remove request
        await requestData.remove();
        // Response
        send(socket, {
            evt: EVENT.ACCEPTFRIENDREQUEST,
            payload: {
                success: true,
                message: "success.success",
                data: friend.toObject(),
            }
        })
        // Transmit
        let isockets: AGServerSocket[] = _.compact(user.get("socketId").map((o: string) => agServer.clients[o]))
        let fsockets: AGServerSocket[] = _.compact(friend.get("socketId").map((o: string) => agServer.clients[o]))
        // -New friend data
        if (isockets) isockets.forEach(o => o.transmit(PACKET, {
            evt: EVENT.ONACCEPTFRIENDREQUEST,
            payload: _.omit(friend?.toObject(), "socketId")
        }, {}))
        if (fsockets) fsockets.forEach(o => o.transmit(PACKET, {
            evt: EVENT.ONACCEPTFRIENDREQUEST,
            payload: _.omit(user?.toObject(), "socketId")
        }, {}))

        // -Remove old request
        let transData = {
            evt: EVENT.REMOVEFRIENDREQUEST,
            payload: _.omit(requestData.toObject(), "socketId")
        }
        // -Mine
        if (isockets) isockets.forEach(o => o.transmit(PACKET, transData, {}))
        // -Friend
        if (fsockets) fsockets.forEach(o => o.transmit(PACKET, transData, {}))
    } catch (error) {
        send(socket, {
            evt: EVENT.ACCEPTFRIENDREQUEST,
            payload: {
                success: false,
                message: error
            }
        })
    }
}

async function refuseFriendRequest(agServer: AGServer, socket: AGServerSocket, data: any) {
    try {
        let { requestId } = data
        if (!requestId) throw 'validate.missing_input';
        // Get request
        let requestData = await FriendRequest.findOne({ _id: requestId, to: socket.authToken?._id })
            .populate({
                path: 'from',
                select: common.dbselect.user,
            })
            .populate({
                path: 'to',
                select: common.dbselect.user,
            })
        if (!requestData) throw 'error.bad';
        // Check user exist
        let friend = await User.findOne({ _id: requestData.get('from').get('_id'), active: true })
            .select(common.dbselect.user)
        if (!friend) throw 'error.find_user';
        let user = await User.findById(socket.authToken?._id)
            .select(common.dbselect.user)
        if (!user) throw 'error.find_user';
        // Remove request
        await requestData.remove();
        // Response
        send(socket, {
            evt: EVENT.REFUSEFRIENDREQUEST,
            payload: {
                success: true,
                message: "success.success",
            }
        })
        // Transmit
        let transData = {
            evt: EVENT.REMOVEFRIENDREQUEST,
            payload: _.omit(requestData.toObject(), "socketId")
        }
        // -Mine
        let isockets: AGServerSocket[] = _.compact(user.get("socketId").map((o: string) => agServer.clients[o]))
        isockets.forEach(o => o.transmit(PACKET, transData, {}))
        // -Friend
        let fsockets: AGServerSocket[] = _.compact(friend.get("socketId").map((o: string) => agServer.clients[o]))
        if (fsockets) fsockets.forEach(o => o.transmit(PACKET, transData, {}))
    } catch (error) {
        send(socket, {
            evt: EVENT.REFUSEFRIENDREQUEST,
            payload: {
                success: false,
                message: error
            }
        })
    }
}

async function cancelFriendRequest(agServer: AGServer, socket: AGServerSocket, data: any) {
    try {
        let { requestId } = data
        if (!requestId) throw 'validate.missing_input';
        // Get request
        let requestData = await FriendRequest.findOne({ _id: requestId, from: socket.authToken?._id })
            .populate({
                path: 'from',
                select: common.dbselect.user,
            })
            .populate({
                path: 'to',
                select: common.dbselect.user,
            })
        if (!requestData) throw 'error.bad';
        // Check user exist
        let friend = await User.findOne({ _id: requestData.get('to').get('_id'), active: true })
            .select(common.dbselect.user)
        if (!friend) throw 'error.find_user';
        let user = await User.findById(socket.authToken?._id)
            .select(common.dbselect.user)
        if (!user) throw 'error.find_user';
        // Remove request
        await requestData.remove();
        // Response
        send(socket, {
            evt: EVENT.CANCELFRIENDREQUEST,
            payload: {
                success: true,
                message: "success.success",
            }
        })
        // Transmit
        let transData = {
            evt: EVENT.REMOVEFRIENDREQUEST,
            payload: _.omit(requestData.toObject())
        }
        // -Mine
        let isockets: AGServerSocket[] = _.compact(user.get("socketId").map((o: string) => agServer.clients[o]))
        isockets.forEach(o => o.transmit(PACKET, transData, {}))
        // -Friend
        let fsockets: AGServerSocket[] = _.compact(friend.get("socketId").map((o: string) => agServer.clients[o]))
        if (fsockets) fsockets.forEach(o => o.transmit(PACKET, transData, {}))
    } catch (error) {
        send(socket, {
            evt: EVENT.CANCELFRIENDREQUEST,
            payload: {
                success: false,
                message: error
            }
        })
    }
}

/* __Distribute socket listener__ */
function connection(agServer: AGServer, socket: AGServerSocket) {
    (async () => {
        for await (let request of socket.receiver(PACKET)) {
            try {
                let { evt, data } = request;

                switch (evt) {
                    case EVENT.GET:
                        get(socket, data)
                        break
                    case EVENT.SETNICKNAME:
                        setNickName(socket, data)
                        break
                    case EVENT.REMOVE:
                        remove(agServer, socket, data)
                        break
                    case EVENT.GETFRIENDREQUEST:
                        getFriendRequest(socket)
                        break
                    case EVENT.SENDFRIENDREQUEST:
                        sendFriendRequest(agServer, socket, data)
                        break
                    case EVENT.ACCEPTFRIENDREQUEST:
                        acceptFriendRequest(agServer, socket, data)
                        break
                    case EVENT.REFUSEFRIENDREQUEST:
                        refuseFriendRequest(agServer, socket, data)
                        break
                    case EVENT.CANCELFRIENDREQUEST:
                        cancelFriendRequest(agServer, socket, data)
                        break
                    default:
                        break;
                }
            } catch (error) {
                request.error(error);
            }
        }
    })();
}

/*__Send__*/
function send(socket: AGServerSocket, payload: { evt: string, payload: { success: boolean, message?: string, data?: any } }) {
    socket.transmit(PACKET, payload, {});
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