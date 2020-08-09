import { AGServer, AGServerSocket } from "socketcluster-server";
import { Chatroom, User, UserChatRoom, UserFriend } from "../../database/ModelDatabase";
import { Document } from "mongoose";
import common from "../../common";
import _ from "underscore";

const PACKET = common.packet.CHATROOM;
const EVENT = common.event.CHATROOM;

/* __Handle__ */
async function getAllUserChatrooms(socket: AGServerSocket, data: any) {
    try {
        data = data || {}
        let { page } = data
        // Input handle
        const limit = 25;
        if (!_.isNumber(page)) page = 1;
        let skip = (page - 1) * limit;
        // Get User chatroom data
        let userChatrooms = await UserChatRoom.find({ user: socket.authToken?._id })
            .populate('chatroom')
            .populate('chatroom.lastMessage')
            .populate({
                path: 'chatroom.users',
                select: common.dbselect.user,
            })
            .sort({updateTime: -1})
            .skip(skip)
            .limit(limit)
            .then(data => data.map(o => o.toObject()))
            .then(async data => {
                return await Promise.all(data.map(async o => {
                    o.chatroom.friends = await UserFriend.find({ user: { $in: o.chatroom.users.map((o: any) => o.toString()) }, friend: socket.authToken?._id });
                    return o;
                }))
            })
        // Response
        send(socket, {
            evt: EVENT.GETALLUSERCHATROOMS,
            payload: {
                success: true,
                data: userChatrooms,
            }
        })
    } catch (error) {
        send(socket, {
            evt: EVENT.GETALLUSERCHATROOMS,
            payload: {
                success: false,
                message: error
            }
        })
    }
}
// Cần tích hợp socket channel
async function create(socket: AGServerSocket, data: any) {
    try {
        let { users, name, type } = data
        // Handle input
        users = _.uniq(users);
        // Validate
        if (
            !_.contains(common.type.CHAT_ROOM, type) || !_.isArray(users) || _.isEmpty(users) ||
            _.contains(users, socket.authToken?._id) ||
            (type === common.type.CHAT_ROOM.CONVERSATION && _.size(users) != 1) ||
            (type === common.type.CHAT_ROOM.GROUP && !_.isString(name))
        ) throw 'error.bad';

        // Push mine
        users.push(socket.authToken?._id)

        // Get list user
        let usersData = await User.find({ _id: { $in: users }, active: true })
            .select(common.dbselect.user)

        // Check
        if (
            !_.isArray(usersData) ||
            _.size(usersData) <= 1 ||
            (type === common.type.CHAT_ROOM.CONVERSATION && _.size(usersData) != 2) ||
            (type === common.type.CHAT_ROOM.GROUP && _.size(usersData) > 50)
        )
            throw 'error.error_occurred';

        // Create chatroom
        let chatroom: Document | undefined = undefined;

        if (type == common.type.CHAT_ROOM.CONVERSATION) { // -If type of chat if conversation check old chatroom is exist
            // Get friend data
            let friendData = usersData.find(o => o.get('_id') !== socket.authToken?._id);
            // Get all friend chatroom data
            let chatroomsData = await UserChatRoom.find({ user: friendData?.get('_id') })
            let chatroomsId = chatroomsData.map(o => o.get('chatroom'))
            // Find chat room with me
            if (!_.isEmpty(chatroomsId)) {
                let chatroomWithMe = await Chatroom.findOne({ _id: { $in: chatroomsId }, users: socket.authToken?._id })
                if (chatroomWithMe) {
                    chatroom = chatroomWithMe;
                }
            }
        }

        if (!chatroom) {
            chatroom = new Chatroom({ name, type, users: usersData.map(o => o.get('_id')), createdTime: new Date(), updateTime: new Date() })
            await chatroom.save()
        }

        // Create chatroom data
        let usersChatroom = usersData.map(async user => {
            // If user is not mine and is friend with me, archive is true
            let archive = user.get('_id') == socket.authToken?._id ? true : false;
            if (!archive) {
                let friendData = await UserFriend.findOne({ user: user.get('_id'), friend: socket.authToken?._id })
                if (friendData) archive = true;
            }

            let userChatroom = await UserChatRoom.findOne({ user: user.get('_id'), chatroom: (chatroom as Document).get('_id') })
            if (!userChatroom) {
                userChatroom = new UserChatRoom({
                    user: user.get('_id'),
                    archive,
                    chatroom: (chatroom as Document).get('_id')
                })
                await userChatroom.save()
            }
            return userChatroom
        })

        // Response
        send(socket, {
            evt: EVENT.CREATE,
            payload: {
                success: true,
                message: "success.success",
                data: {
                    chatroom: chatroom.toObject(),
                    users: usersData,
                }
            }
        })
    } catch (error) {
        send(socket, {
            evt: EVENT.CREATE,
            payload: {
                success: false,
                message: error
            }
        })
    }
}
// Cần tích hợp socket channel
async function unfollow(socket: AGServerSocket, data: any) {
    try {
        let { chatroomId } = data
        if (!_.isString(chatroomId)) throw 'error.bad';
        // Find user chatroom
        let userChatroom = await UserChatRoom.findOne({ chatroom: chatroomId, user: socket.authToken?._id })
        if (!userChatroom) throw 'error.never_follow_chatroom';
        await userChatroom.remove()
        // Response
        send(socket, {
            evt: EVENT.UNFOLLOW,
            payload: {
                success: true,
                message: "success.success",
            }
        })
    } catch (error) {
        send(socket, {
            evt: EVENT.UNFOLLOW,
            payload: {
                success: false,
                message: error
            }
        })
    }
}
// Cần tích hợp socket channel
async function invite(socket: AGServerSocket, data: any) {
    try {
        let { chatroomId, userId } = data
        if (!_.isString(chatroomId) || !_.isString(userId) || userId === socket.authToken?._id) throw 'error.bad';
        // Check chatroom
        let chatroom = await Chatroom.findById(chatroomId);
        if (!chatroom || chatroom.get('type') == common.type.CHAT_ROOM.CONVERSATION) throw 'error.error_occurred';
        // Check user chatroom exist
        let userChatroom = await UserChatRoom.findOne({ user: userId, chatroom: chatroom.get('_id') })
        if (userChatroom) throw 'error.error_occurred';
        // Create user chatroom 
        // -Checkfriend
        let friendData = await UserFriend.findOne({ user: userId, friend: socket.authToken?._id })
        // -Create
        userChatroom = new UserChatRoom({
            user: userId,
            archive: friendData ? false : true,
            chatroom: chatroomId,
        })
        await userChatroom.save()
        // Add chatroom user
        chatroom.set('users', [...chatroom.get('users'), userId])
        await chatroom.save()

        // Response
        send(socket, {
            evt: EVENT.INVITE,
            payload: {
                success: true,
                message: "success.success",
            }
        })
    } catch (error) {
        send(socket, {
            evt: EVENT.INVITE,
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
                    case EVENT.GETALLUSERCHATROOMS:
                        await getAllUserChatrooms(socket, data)
                        break
                    case EVENT.CREATE:
                        await create(socket, data)
                        break
                    case EVENT.INVITE:
                        await invite(socket, data)
                        break
                    case EVENT.UNFOLLOW:
                        await unfollow(socket, data)
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