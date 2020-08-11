import { AGServer, AGServerSocket } from "socketcluster-server";
import { Chatroom, User, UserChatRoom, Message } from "../../database/ModelDatabase";
import common from "../../common";
import _ from "underscore";

const PACKET = common.packet.MESSAGE;
const EVENT = common.event.MESSAGE;

/* __Handle__ */
async function sendMessage(agServer: AGServer, socket: AGServerSocket, data: any) {
    try {
        let { text, chatroomId } = data
        // Input handle
        if (!_.isString(chatroomId) || !_.isString(text)) throw 'error.bad';
        // Get and check data
        // -Check chatroom
        let chatroom = await Chatroom.findById(chatroomId)
            .populate('lastMessage')
        if (!chatroom) throw 'error.chatroom_exist';
        // -Check user chatroom
        let myChatroom = await UserChatRoom.findOne({ chatroom: chatroomId, user: socket.authToken?._id })
            .select(common.dbselect.userChatroom)
            .populate({ path: 'user', select: common.dbselect.user })
        if (!myChatroom) throw 'error.never_follow_chatroom';
        // -Get friends chatroom
        let friendsChatroom = await UserChatRoom.find({ chatroom: myChatroom.get('chatroom'), user: { $ne: socket.authToken?._id } })
            .select(common.dbselect.userChatroom)
            .populate({ path: 'user', select: common.dbselect.user })
        // Handle
        // -Create message
        let message = new Message({
            chatroom: chatroomId,
            user: socket.authToken?._id,
            message: text,
            createdTime: new Date(),
            active: true
        })
        await message.save()
        await message.populate({ path: 'user', select: common.dbselect.user }).execPopulate()
        // -Update chatroom
        chatroom.set("lastMessage", message.get('_id'));
        chatroom.set("updateTime", new Date());
        await chatroom.save()
        await chatroom.populate({ path: 'lastMessage' }).execPopulate()
        // -User chatrooom update
        // --Mychatroom
        myChatroom.set('read', true)
        myChatroom.set("updateTime", new Date());
        if (!myChatroom.get('show')) myChatroom.set('show', true)
        await myChatroom.save()
        // --Friend chatroom
        await Promise.all(friendsChatroom.map(async userChatroom => {
            userChatroom.set('read', false)
            userChatroom.set("updateTime", new Date());
            if (!userChatroom.get('show')) userChatroom.set('show', true)
            if (!userChatroom.get('active')) userChatroom.set('active', true)
            await userChatroom.save()
        }));

        // Response to everyone
        [myChatroom, ...friendsChatroom].forEach(userChatroom => {
            let sockets: AGServerSocket[] = _.compact(userChatroom.get('user').get('socketId').map((o: string) => agServer.clients[o]))
            // Transmit message receive update data
            let transMessage = {
                evt: EVENT.RECEIVE,
                payload: message
            }
            if (sockets) sockets.forEach(o => o.transmit(PACKET, transMessage, {}))
            // Transmit chatroom update data
            let transChatroom = {
                evt: common.event.CHATROOM.UPDATE,
                payload: {
                    chatroom,
                    myChatroom: userChatroom,
                    friendsChatroom: [myChatroom, ...friendsChatroom].filter(o => o?.get('user').get('_id') !== userChatroom.get('user').get('_id'))
                }
            }
            if (sockets) sockets.forEach(o => o.transmit(common.packet.CHATROOM, transChatroom, {}))
        })
    } catch (error) {
        send(socket, {
            evt: EVENT.SEND,
            payload: {
                success: false,
                message: error
            }
        })
    }
}

async function getMessages(socket: AGServerSocket, data: any) {
    try {
        let { skip, chatroomId } = data
        // Input handle
        if (!_.isNumber(skip)) skip = 0;
        if (!_.isString(chatroomId) || !_.isNumber(skip)) throw 'error.bad';
        // Get and check data
        const limit = 25;
        let messages = await Message.find({ chatroom: chatroomId })
            .populate('user')
            .sort({ "createdTime": -1 })
            .skip(skip)
            .limit(limit)
        // Response to everyone
        send(socket, {
            evt: EVENT.GET,
            payload: {
                success: true,
                data: {
                    chatroomId,
                    messages,
                },
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

/* __Distribute socket listener__ */
function connection(agServer: AGServer, socket: AGServerSocket) {
    (async () => {
        for await (let request of socket.receiver(PACKET)) {
            try {
                let { evt, data } = request;

                switch (evt) {
                    case EVENT.SEND:
                        await sendMessage(agServer, socket, data)
                        break
                    case EVENT.GET:
                        await getMessages(socket, data)
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