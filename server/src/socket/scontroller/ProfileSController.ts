import { AGServer, AGServerSocket } from "socketcluster-server";
import { User } from "../../database/ModelDatabase";
import bcrypt from "bcrypt";
import common from "../../common";
import util from "../../util";
import _ from "underscore";

const PACKET = common.packet.PROFILE;
const EVENT = common.event.PROFILE;

/* __Handle__ */
async function get(request: any) {
    // Find data
    let user = await User.findById(request.socket.authToken._id)
        .select(common.dbselect.profile)
    if (!user) return request.error('error.find_user');
    // Response
    request.end(user.toObject())
}

async function put(request: any) {
    let { oldPassword, password, firstName, lastName, avatar } = request?.data?.data;
    // Get user
    let user = await User.findById(request.socket.authToken._id)
    if (!user) return request.error('error.find_user');
    // Check oldpassword
    if (!oldPassword || typeof oldPassword != 'string') return request.error('missing_input')
    let compareResult = await bcrypt.compare(oldPassword, user.get("password"))
    if (!compareResult) return request.error('error.bad');
    // Encrypt password
    if (typeof password === 'string' && password.length >= 8 && password.length <= 32) password = await bcrypt.hash(password, 12)
    // Update data
    if (password) {
        user.set('password', password);
        user.set('device', {});
    }
    if (firstName) user.set('firstName', firstName);
    if (lastName) user.set('lastName', lastName);
    if (avatar) user.set('avatar', avatar);
    user.set('updateTime',new Date())
    await user.save();
    // Response
    request.end({
        message: "success.update_user",
        data: util.common.userPrivateInfoFilter(user.toObject())
    })
    // Check update password logout
    if (password) {
        // Disconnect
        request.socket.deauthenticateSelf()
        request.socket.disconnect()
    }
}

async function remove(request: any) {
    let { password } = request?.data?.data;
    // Get user
    let user = await User.findById(request.socket.authToken._id)
    if (!user) return request.error('error.find_user');
    // Check oldpassword
    if (!password || typeof password != 'string') return request.error('missing_input')
    let compareResult = await bcrypt.compare(password, user.get("password"))
    if (!compareResult) return request.error('error.bad');
    // Logout from all device
    user.set('device', {});
    user.set('updateTime',new Date())
    user.set('active', false);
    await user.save();
    // Response
    request.end({
        message: "success.update_user",
    })
    // Disconnect
    request.socket.deauthenticateSelf()
    request.socket.disconnect()
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
                    case EVENT.PUT:
                        await put(request)
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