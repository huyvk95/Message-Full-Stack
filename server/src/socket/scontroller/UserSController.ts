import { AGServer, AGServerSocket } from "socketcluster-server";
import { User } from "../../database/ModelDatabase";
import common from "../../common";

const PACKET = common.packet.USER;
const EVENT = common.event.USER;

/* __Handle__ */
async function get(request: any) {
    let { string } = request?.data?.data
    let result: any[] = [];
    // Find
    await User.find({ email: { "$regex": `.*${string}*`, "$options": "i" } }).limit(50)
        .select(common.dbselect.user)
        .then(data => { result = result.concat(data) })
    await User.find({ firstName: { "$regex": `.*${string}*`, "$options": "i" } }).limit(50)
        .select(common.dbselect.user)
        .then(data => { result = result.concat(data) });
    await User.find({ lastName: { "$regex": `.*${string}*`, "$options": "i" } }).limit(50)
        .select(common.dbselect.user)
        .then(data => { result = result.concat(data) });
    // Data handle
    result = result.map(o => Object.assign(o.toObject(), { _id: o._id.toString() }))
    // Filter
    result = result.filter((o, i) => result.findIndex(oo => oo._id == o._id) == i)
    //Response
    request.end(result.slice(0, 50))
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
export default function controller(agServer: AGServer, socket: AGServerSocket, eventName: string) {
    switch (eventName) {
        case 'connection':
            return connection(agServer, socket)
        default:
            break;
    }
}