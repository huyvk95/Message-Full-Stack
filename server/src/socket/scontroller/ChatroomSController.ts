import { AGServer, AGServerSocket } from "socketcluster-server";
import { Chatroom, User, UserChatRoom, UserFriend } from "../../database/ModelDatabase";
import { Document } from "mongoose";
import common from "../../common";
import _, { select } from "underscore";

const PACKET = common.packet.CHATROOM;
const EVENT = common.event.CHATROOM;

/* __Handle__ */
async function getAllUserChatrooms(socket: AGServerSocket, data: any) {
    try {
        data = data || {}
        let { skip } = data
        // Input handle
        const limit = 25;
        if (!_.isNumber(skip)) skip = 0;
        // Get all user chatroom data
        let userChatrooms = await UserChatRoom.find({ user: socket.authToken?._id, show: true, active: true })
            .populate({ path: 'user', select: common.dbselect.user })
            .skip(skip)
            .limit(limit)

        let payload = await Promise.all(userChatrooms.map(async (myChatroom) => {
            let chatroom = await Chatroom.findById(myChatroom.get('chatroom'))
                .populate('lastMessage')
            let friendsChatroom = await UserChatRoom.find({ chatroom: myChatroom.get('chatroom'), user: { $ne: socket.authToken?._id } })
                .select(common.dbselect.userChatroom)
                .populate({ path: 'user', select: common.dbselect.user })
            return { chatroom, myChatroom, friendsChatroom };
        }))
            .then(data => data.sort((a, b) => new Date(b.chatroom?.get('updateTime')).getTime() - new Date(a.chatroom?.get('updateTime')).getTime()))
        // Response
        send(socket, {
            evt: EVENT.GETALLUSERCHATROOMS,
            payload: {
                success: true,
                data: payload
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

        // Check
        if (
            !_.isArray(users) ||
            _.size(users) <= 1 ||
            (type === common.type.CHAT_ROOM.CONVERSATION && _.size(users) != 2) ||
            (type === common.type.CHAT_ROOM.GROUP && _.size(users) > 50)
        )
            throw 'error.error_occurred';

        // Create chatroom
        let chatroom: Document | null = null;

        if (type == common.type.CHAT_ROOM.CONVERSATION) { // -If type of chat if conversation check old chatroom is exist
            // Get friend data
            let friendData = users.find(o => o !== socket.authToken?._id);
            // Get all friend chatroom data
            let chatroomsData = await UserChatRoom.find({ user: friendData })
            let chatroomsId = chatroomsData.map(o => o.get('chatroom'))
            // Find chat room with me
            let userChatroom = await UserChatRoom.findOne({ user: socket.authToken?._id, chatroom: { $in: chatroomsId } })
            if (userChatroom) {
                chatroom = await Chatroom.findById(userChatroom.get('chatroom'))
                    .populate('lastMessage')
            }
            // if (!_.isEmpty(chatroomsId)) {
            //     let chatroomWithMe = await Chatroom.findOne({ _id: { $in: chatroomsId } })
            //     if (chatroomWithMe) chatroom = chatroomWithMe;
            // }
        }

        if (!chatroom) {
            chatroom = new Chatroom({ name, type, createdTime: new Date(), updateTime: new Date() })
            await chatroom.save()
        }

        // Create chatroom data
        let usersChatroom = await Promise.all(users.map(async (userId: string) => {
            // If user is not mine and is friend with me, archive is true
            let archive = userId == socket.authToken?._id ? true : false;
            if (!archive) {
                let friendData = await UserFriend.findOne({ user: userId, friend: socket.authToken?._id })
                if (friendData) archive = true;
            }

            let userChatroom = await UserChatRoom.findOne({ user: userId, chatroom: (chatroom as Document).get('_id') })
            // -Modify userchatroom if my chatroom exist
            if (userChatroom && userChatroom.get('user').toString() === socket.authToken?._id) {
                userChatroom.set('show', true)
                userChatroom.set('active', true)
            }
            // -Create user chatroom
            if (!userChatroom) {
                userChatroom = new UserChatRoom({
                    user: userId,
                    archive,
                    show: type === 'conversation' && userId != socket.authToken?._id ? false : true,
                    chatroom: (chatroom as Document).get('_id')
                })
            }

            await userChatroom.save()
            // Return userChatroom
            return await UserChatRoom.findById(userChatroom.get('_id'))
                .select(common.dbselect.userChatroom)
                .populate({ path: 'user', select: common.dbselect.user })
        }))

        // Response
        send(socket, {
            evt: EVENT.CREATE,
            payload: {
                success: true,
                message: "success.success",
                data: {
                    chatroom: chatroom.toObject(),
                    myChatroom: usersChatroom.find(o => o?.get('user')?.get('_id') == socket.authToken?._id),
                    friendsChatroom: usersChatroom.filter(o => o?.get('user')?.get('_id') != socket.authToken?._id)
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

async function unfollow(agServer: AGServer, socket: AGServerSocket, data: any) {
    try {
        let { chatroomId } = data
        if (!_.isString(chatroomId)) throw 'error.bad';
        // Find my chatroom
        let myChatroom = await UserChatRoom.findOne({ chatroom: chatroomId, user: socket.authToken?._id })
            .select(common.dbselect.userChatroom)
            .populate({ path: 'user', select: common.dbselect.user })
        if (!myChatroom) throw 'error.never_follow_chatroom';
        // Get chatroom
        let chatroom = await Chatroom.findById(myChatroom.get('chatroom'))
            .populate('lastMessage')
        if (!chatroom) throw 'error.chatroom_exist';
        // Get friends chatroom
        let friendsChatroom = await UserChatRoom.find({ chatroom: myChatroom.get('chatroom'), user: { $ne: socket.authToken?._id } })
            .select(common.dbselect.userChatroom)
            .populate({ path: 'user', select: common.dbselect.user })
        // Handle
        myChatroom.set('active', false)
        await myChatroom.save();
        // Response
        // -Response to another
        friendsChatroom.forEach(userChatroom => {
            let fsockets: AGServerSocket[] = _.compact(userChatroom.get('user').get('socketId').map((o: string) => agServer.clients[o]))
            let transData = {
                evt: EVENT.UPDATE,
                payload: {
                    chatroom,
                    myChatroom: userChatroom,
                    friendsChatroom: [myChatroom, ...friendsChatroom].filter(o => o?.get('user').get('_id') !== userChatroom.get('user').get('_id'))
                }
            }
            if (fsockets) fsockets.forEach(o => o.transmit(PACKET, transData, {}))
        })
        // -Response to mine
        let isockets: AGServerSocket[] = _.compact(myChatroom.get('user').get('socketId').map((o: string) => agServer.clients[o]))
        isockets.forEach(sc => {
            send(sc, {
                evt: EVENT.UNFOLLOW,
                payload: {
                    success: true,
                    message: "success.success",
                    data: { chatroom, myChatroom, friendsChatroom }
                }
            })
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

async function maskAsRead(agServer: AGServer, socket: AGServerSocket, data: any) {
    try {
        let { userChatroomId } = data
        if (!_.isString(userChatroomId)) throw 'error.bad';
        // Find my chatroom
        let myChatroom = await UserChatRoom.findOne({ _id: userChatroomId, user: socket.authToken?._id })
            .select(common.dbselect.userChatroom)
            .populate({ path: 'user', select: common.dbselect.user })
        if (!myChatroom) throw 'error.never_follow_chatroom';
        // Get chatroom
        let chatroom = await Chatroom.findById(myChatroom.get('chatroom'))
            .populate('lastMessage')
        if (!chatroom) throw 'error.chatroom_exist';
        // Get friends chatroom
        let friendsChatroom = await UserChatRoom.find({ chatroom: myChatroom.get('chatroom'), user: { $ne: socket.authToken?._id } })
            .select(common.dbselect.userChatroom)
            .populate({ path: 'user', select: common.dbselect.user })
        // Handle
        myChatroom.set('read', true)
        await myChatroom.save();
        // Response
        // -Response to everyone
        [myChatroom, ...friendsChatroom].forEach(userChatroom => {
            let fsockets: AGServerSocket[] = _.compact(userChatroom.get('user').get('socketId').map((o: string) => agServer.clients[o]))
            let transData = {
                evt: EVENT.UPDATE,
                payload: {
                    chatroom,
                    myChatroom: userChatroom,
                    friendsChatroom: [myChatroom, ...friendsChatroom].filter(o => o?.get('user').get('_id') !== userChatroom.get('user').get('_id'))
                }
            }
            if (fsockets) fsockets.forEach(o => o.transmit(PACKET, transData, {}))
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

async function maskAsUnread(agServer: AGServer, socket: AGServerSocket, data: any) {
    try {
        let { userChatroomId } = data
        if (!_.isString(userChatroomId)) throw 'error.bad';
        // Find my chatroom
        let myChatroom = await UserChatRoom.findOne({ _id: userChatroomId, user: socket.authToken?._id })
            .select(common.dbselect.userChatroom)
            .populate({ path: 'user', select: common.dbselect.user })
        if (!myChatroom) throw 'error.never_follow_chatroom';
        // Get chatroom
        let chatroom = await Chatroom.findById(myChatroom.get('chatroom'))
            .populate('lastMessage')
        if (!chatroom) throw 'error.chatroom_exist';
        // Get friends chatroom
        let friendsChatroom = await UserChatRoom.find({ chatroom: myChatroom.get('chatroom'), user: { $ne: socket.authToken?._id } })
            .select(common.dbselect.userChatroom)
            .populate({ path: 'user', select: common.dbselect.user })
        // Handle
        myChatroom.set('read', false)
        await myChatroom.save();
        // Response
        // -Response to everyone
        [myChatroom, ...friendsChatroom].forEach(userChatroom => {
            let fsockets: AGServerSocket[] = _.compact(userChatroom.get('user').get('socketId').map((o: string) => agServer.clients[o]))
            let transData = {
                evt: EVENT.UPDATE,
                payload: {
                    chatroom,
                    myChatroom: userChatroom,
                    friendsChatroom: [myChatroom, ...friendsChatroom].filter(o => o?.get('user').get('_id') !== userChatroom.get('user').get('_id'))
                }
            }
            if (fsockets) fsockets.forEach(o => o.transmit(PACKET, transData, {}))
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

// Done done
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
                        await unfollow(agServer, socket, data)
                        break
                    case EVENT.MASK_AS_READ:
                        await maskAsRead(agServer, socket, data)
                        break
                    case EVENT.MASK_AS_UNREAD:
                        await maskAsUnread(agServer, socket, data)
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