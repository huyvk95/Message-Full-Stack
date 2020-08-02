import { AGServer, AGServerSocket } from "socketcluster-server";
import { User, UserFriend } from "../../database/ModelDatabase";
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

async function add(request: any) {
    let { userId } = request?.data?.data
    if (!userId) return request.error('validate.missing_input');
    // Friend data
    let friend = await User.findOne({ _id: userId, active: true })
        .select(common.dbselect.user)
    if (!friend) return request.error('error.find_user');
    // Check friend data
    // -Exist
    let friendData = await UserFriend.findOne({ user: request.socket.authToken._id, friend: userId })
    if (friendData) return request.error('error.been_friend');
    // -Create
    friendData = new UserFriend({
        user: request.socket.authToken._id,
        friend: userId
    })
    await friendData.save();
    // Response
    request.end(friend.toObject())
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
        message: "success",
        data: friendData.toObject()
    })
}

async function remove(request: any) {
    let { dataId } = request?.data?.data
    if (!dataId) return request.error('validate.missing_input');
    // Get friend data
    let friendData = await UserFriend.findById(dataId)
    if (!friendData) return request.error('error.not_friend');
    // Remove
    await friendData.remove();
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