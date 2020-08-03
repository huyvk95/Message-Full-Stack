import { AGServer, AGServerSocket } from "socketcluster-server";
import { User, UserFriend, FriendRequest } from "../../database/ModelDatabase";
import common from "../../common";

const PACKET = common.packet.FRIEND;
const EVENT = common.event.FRIEND;

/* __Handle__ */
async function get(request: any) {
    let { online, string } = request?.data?.data
    // Get data
    let friendData = await UserFriend.find({ user: request.socket.authToken._id })
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

    request.end(friendData)
}

async function setNickName(request: any) {
    let { dataId, nickname } = request?.data?.data
    if (!dataId || typeof nickname !== 'string') return request.error('validate.missing_input');
    // Get friend data
    let friendData = await UserFriend.findById(dataId)
        .populate({
            path: 'friend',
            select: common.dbselect.user,
        })
    if (!friendData) return request.error('error.not_friend');
    // Set nick name
    friendData.set('nickname', nickname);
    await friendData.save()
    // Response
    request.end({
        success: true,
        message: "success.success",
        data: friendData.toObject()
    })
}

async function remove(request: any) {
    let { dataId } = request?.data?.data
    if (!dataId) return request.error('validate.missing_input');
    // Get mine friend data
    let friendData = await UserFriend.findById(dataId)
    if (!friendData) return request.error('error.not_friend');
    // Get your friend data
    let yourFriendData = await UserFriend.findOne({ from: friendData.get('friend'), to: request.socket.authToken._id })
    // Remove
    await friendData.remove();
    if (yourFriendData) await yourFriendData.remove();
    // Response
    request.end({
        success: true,
        message: "success.success"
    })
}

async function sendFriendRequest(request: any) {
    let { userId } = request?.data?.data
    if (!userId) return request.error('validate.missing_input');
    if (userId === request.socket.authToken._id) return request.error('error.bad');
    // Check request
    let friendRequest = await FriendRequest.findOne({ from: request.socket.authToken._id, to: userId })
    if (friendRequest) return request.error('error.have_send_request');
    // Check user exist
    let friend = await User.findOne({ _id: userId, active: true });
    if (!friend) return request.error('error.find_user');
    // Check friend exist
    let friendData = await UserFriend.findOne({ user: request.socket.authToken._id, friend: userId })
    if (friendData) return request.error('error.been_friend');
    // Create friend request
    friendRequest = new FriendRequest({ from: request.socket.authToken._id, to: userId })
    await friendRequest.save()
    // Response
    request.end({
        success: true,
        message: "success.success",
        data: friendRequest.toObject()
    })
}

async function acceptFriendRequest(request: any) {
    let { requestId } = request?.data?.data
    if (!requestId) return request.error('validate.missing_input');
    // Get request
    let requestData = await FriendRequest.findOne({ _id: requestId, to: request.socket.authToken._id });
    if (!requestData) return request.error('error.bad');
    // Check user exist
    let friend = await User.findOne({ _id: requestData.get('from'), active: true })
        .select(common.dbselect.user)
    if (!friend) return request.error('error.find_user');
    // Create friend 2 side
    // -Mine
    let friendMine = await UserFriend.findOne({ user: request.socket.authToken._id, friend: requestData.get('from') })
    if (friendMine) return request.error('error.been_friend');
    friendMine = new UserFriend({ user: request.socket.authToken._id, friend: requestData.get('from') })
    await friendMine.save()
    // -You
    let friendYour = await UserFriend.findOne({ user: requestData.get('from'), friend: request.socket.authToken._id })
    if (friendYour) return request.error('error.been_friend');
    friendYour = new UserFriend({ user: requestData.get('from'), friend: request.socket.authToken._id })
    await friendYour.save()
    // Remove request
    await requestData.remove();
    // Response
    request.end({
        success: true,
        message: "success.success",
        data: friend.toObject(),
    })
}

async function refuseFriendRequest(request: any) {
    let { requestId } = request?.data?.data
    if (!requestId) return request.error('validate.missing_input');
    // Get request
    let requestData = await FriendRequest.findOne({ _id: requestId, to: request.socket.authToken._id });
    if (!requestData) return request.error('error.bad');
    // Remove request
    await requestData.remove();
    // Response
    request.end({
        success: true,
        message: "success.success",
    })
}

async function cancelFriendRequest(request: any) {
    let { requestId } = request?.data?.data
    if (!requestId) return request.error('validate.missing_input');
    // Get request
    let requestData = await FriendRequest.findOne({ _id: requestId, from: request.socket.authToken._id });
    if (!requestData) return request.error('error.bad');
    // Remove request
    await requestData.remove();
    // Response
    request.end({
        success: true,
        message: "success.success",
    })
}

/* __Distribute socket listener__ */
function connection(agServer: AGServer, socket: AGServerSocket) {
    (async () => {
        for await (let request of socket.procedure(PACKET)) {
            try {
                let { evt } = request.data;

                switch (evt) {
                    case EVENT.GET:
                        await get(request)
                        break
                    case EVENT.SETNICKNAME:
                        await setNickName(request)
                        break
                    case EVENT.REMOVE:
                        await remove(request)
                        break
                    case EVENT.SENDFRIENDREQUEST:
                        await sendFriendRequest(request)
                        break
                    case EVENT.ACCEPTFRIENDREQUEST:
                        await acceptFriendRequest(request)
                        break
                    case EVENT.REFUSEFRIENDREQUEST:
                        await refuseFriendRequest(request)
                        break
                    case EVENT.CANCELFRIENDREQUEST:
                        await cancelFriendRequest(request)
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

/* __Distribute server listener__ */
export default function userSController(agServer: AGServer, socket: AGServerSocket, eventName: string) {
    switch (eventName) {
        case 'connection':
            return connection(agServer, socket)
        default:
            break;
    }
}