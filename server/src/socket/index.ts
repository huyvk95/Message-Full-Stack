import { AGServer } from "socketcluster-server";
import socketMiddleware from "./SocketMiddleware";
import socketListener from "./SocketListener";

export default async function socketInit(agServer: AGServer) {
    // Middleware
    socketMiddleware(agServer)
    // Listener
    socketListener(agServer)
};    