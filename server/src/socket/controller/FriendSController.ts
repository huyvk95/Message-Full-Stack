import { AGServer, AGServerSocket } from "socketcluster-server";
import { User, UserFriend } from "../../database/ModelDatabase";
import common from "../../common";
import util from "../../util";

const PACKET = common.packet.FRIEND;
const EVENT = common.event.FRIEND;

/* __Handle__ */
async function get(request: any) {
    // Find data
    let user = await User.findById(request.socket.authToken._id)
    if (!user) return request.error('error.find_user');
    // Get friend data
    if (!user.get('friendData')) {
        let userFriend = new UserFriend({})
        await userFriend.save()
        user.set('friendData', userFriend.get('_id'))
        await user.save()
    }
    let friendData = await UserFriend.findById(user.get('friendData'))
        .populate('friends.user')
    if (!friendData) return request.error('error.unknow');
    let friends = friendData.get('friends').toObject();
    // Response
    let response = friends.map((o: any) => util.common.dataKeysFilter(o.user, ["_id", "email", "firstName", "firstName", "avatar", "online", "lastOnlineTime"]))

    request.end(response)
}

async function add(request: any) {
    let { userId } = request?.data?.data
    if (!userId) return request.error('validate.missing_input');
    // Find data
    let user = await User.findById(request.socket.authToken._id)
    if (!user) return request.error('error.find_user');
    // Friend data
    let friend = await User.findOne({ _id: userId, active: true })
    if (!friend) return request.error('error.find_user');
    // Get friend data
    let friendData = await UserFriend.findById(user.get('friendData'))
    if (!friendData) {
        friendData = new UserFriend({})
        friendData.save()
        user.set('friendData', friendData.get('_id'))
        await user.save()
    }
    // Set new user friend data
    let friends = friendData.get('friends').toObject();
    if (friends.some((o: any) => o.user.toString() === userId)) return request.error('error.been_friend');
    friends.push({ user: userId })
    friendData.set('friends', friends);
    await friendData.save();
    // Response
    request.end(util.common.dataKeysFilter(friend.toObject(), ["_id", "email", "firstName", "firstName", "avatar", "online", "lastOnlineTime"]))
}

async function setNickName(request: any) {
    let { userId, nickname } = request?.data?.data
    if (!userId || typeof nickname !== 'string') return request.error('validate.missing_input');
    // Find data
    let user = await User.findById(request.socket.authToken._id)
    if (!user) return request.error('error.find_user');
    // Get friend data
    let friendData = await UserFriend.findById(user.get('friendData'))
    if (!friendData) {
        friendData = new UserFriend({})
        friendData.save()
        user.set('friendData', friendData.get('_id'))
        await user.save()
    }
    // Set new user friend data
    let friends = friendData.get('friends').toObject();
    // Get friend document
    let friendDoc = friends.find((o: any) => o.user.toString() === userId)
    if (!friendDoc) return request.error('error.not_friend');
    // Set nick name and save
    friendDoc.nickname = nickname;
    friendData.set('friends', friends);
    await friendData.save();
    // Response
    request.end({
        success: true,
        message: "success"
    })
}

async function remove(request: any) {
    let { userId } = request?.data?.data
    if (!userId) return request.error('validate.missing_input');
    // Find data
    let user = await User.findById(request.socket.authToken._id)
    if (!user) return request.error('error.find_user');
    // Get friend data
    let friendData = await UserFriend.findById(user.get('friendData'))
    if (!friendData) {
        friendData = new UserFriend({})
        friendData.save()
        user.set('friendData', friendData.get('_id'))
        await user.save()
    }
    // Set new user friend data
    let friends = friendData.get('friends').toObject();
    // Get friend document
    let friendDoc = friends.find((o: any) => o.user.toString() === userId)
    if (!friendDoc) return request.error('error.not_friend');
    // Set remove friend and save
    friends.splice(friends.findIndex((o: any) => o.user.toString() === userId), 1)
    friendData.set('friends', friends);
    await friendData.save();
    // Response
    request.end({
        success: true,
        message: "success"
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
                    case EVENT.ADD:
                        await add(request)
                        break
                    case EVENT.SETNICKNAME:
                        await setNickName(request)
                        break
                    case EVENT.REMOVE:
                        await remove(request)
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