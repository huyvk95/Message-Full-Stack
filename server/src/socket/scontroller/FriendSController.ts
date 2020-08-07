import { AGServer, AGServerSocket } from "socketcluster-server";
import { User, UserFriend, FriendRequest } from "../../database/ModelDatabase";
import common from "../../common";

const PACKET = common.packet.FRIEND;
const EVENT = common.event.FRIEND;

/* __Handle__ */
async function get(socket: AGServerSocket, data: any) {
    try {
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
                data = data.map(o => o.get('friend'))
                //Filter
                data = data.filter(o => o.get('active') === true)
                if (online || string) {
                    if (online) data = data.filter((o: any) => o.get('online') === online);
                    if (string) data = data.filter((o: any) => {
                        return new RegExp(`.*${string}.`).test(o.get('email')) || new RegExp(`.*${string}.`).test(o.get('firstName')) || new RegExp(`.*${string}.`).test(o.get('lastName'))
                    });
                }
                return data.map(o => o.toObject())
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
        let { dataId, nickname } = data
        if (!dataId || typeof nickname !== 'string') throw "validate.missing_input";
        // Get friend data
        let friendData = await UserFriend.findOne({ _id: dataId, user: socket.authToken?._id })
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
                data: friendData.toObject(),
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

async function remove(socket: AGServerSocket, data: any) {
    try {
        let { dataId } = data
        if (!dataId) throw 'validate.missing_input';
        // Get mine friend data
        let friendData = await UserFriend.findOne({ _id: dataId, user: socket.authToken?._id })
        if (!friendData) throw 'error.not_friend';
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

async function sendFriendRequest(socket: AGServerSocket, data: any) {
    try {
        let { userId } = data
        if (!userId) throw 'validate.missing_input';
        if (userId === socket.authToken?._id) throw 'error.bad';
        // Check request
        let friendRequest = await FriendRequest.findOne({ from: socket.authToken?._id, to: userId })
        if (friendRequest) throw 'error.have_send_request';
        // Check user exist
        let friend = await User.findOne({ _id: userId, active: true });
        if (!friend) throw 'error.find_user';
        // Check friend exist
        let friendData = await UserFriend.findOne({ user: socket.authToken?._id, friend: userId })
        if (friendData) throw 'error.been_friend';
        // Create friend request
        friendRequest = new FriendRequest({ from: socket.authToken?._id, to: userId })
        await friendRequest.save()
        // Response

        send(socket, {
            evt: EVENT.SENDFRIENDREQUEST,
            payload: {
                success: true,
                message: "success.success",
                data: friendRequest.toObject()
            }
        })
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

async function acceptFriendRequest(socket: AGServerSocket, data: any) {
    try {
        let { requestId } = data
        if (!requestId) throw 'validate.missing_input';
        // Get request
        let requestData = await FriendRequest.findOne({ _id: requestId, to: socket.authToken?._id });
        if (!requestData) throw 'error.bad';
        // Check user exist
        let friend = await User.findOne({ _id: requestData.get('from'), active: true })
            .select(common.dbselect.user)
        if (!friend) throw 'error.find_user';
        // Create friend 2 side
        // -Mine
        let friendMine = await UserFriend.findOne({ user: socket.authToken?._id, friend: requestData.get('from') })
        if (friendMine) throw 'error.been_friend';
        friendMine = new UserFriend({ user: socket.authToken?._id, friend: requestData.get('from') })
        await friendMine.save()
        // -You
        let friendYour = await UserFriend.findOne({ user: requestData.get('from'), friend: socket.authToken?._id })
        if (friendYour) throw 'error.been_friend';
        friendYour = new UserFriend({ user: requestData.get('from'), friend: socket.authToken?._id })
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

async function refuseFriendRequest(socket: AGServerSocket, data: any) {
    try {
        let { requestId } = data
        if (!requestId) throw 'validate.missing_input';
        // Get request
        let requestData = await FriendRequest.findOne({ _id: requestId, to: socket.authToken?._id });
        if (!requestData) throw 'error.bad';
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

async function cancelFriendRequest(socket: AGServerSocket, data: any) {
    try {
        let { requestId } = data
        if (!requestId) throw 'validate.missing_input';
        // Get request
        let requestData = await FriendRequest.findOne({ _id: requestId, from: socket.authToken?._id });
        if (!requestData) throw 'error.bad';
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
                        remove(socket, data)
                        break
                    case EVENT.SENDFRIENDREQUEST:
                        sendFriendRequest(socket, data)
                        break
                    case EVENT.ACCEPTFRIENDREQUEST:
                        acceptFriendRequest(socket, data)
                        break
                    case EVENT.REFUSEFRIENDREQUEST:
                        refuseFriendRequest(socket, data)
                        break
                    case EVENT.CANCELFRIENDREQUEST:
                        cancelFriendRequest(socket, data)
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