import { AGServer } from "socketcluster-server";
import userSController from "./scontroller/UserSController";
import profileSController from "./scontroller/ProfileSController";
import friendSController from "./scontroller/FriendSController";
import chatroomSController from "./scontroller/ChatroomSController";
import processSController from "./scontroller/ProcessSController";
import messageSController from "./scontroller/MessageSController";

export default async function socketListener(agServer: AGServer) {
    for await (let { socket } of agServer.listener('connection')) {
        console.log('Socket on connection');
        // Controller
        processSController(agServer, socket, 'connection')
        userSController(agServer, socket, 'connection');
        profileSController(agServer, socket, 'connection');
        friendSController(agServer, socket, 'connection');
        chatroomSController(agServer, socket, 'connection');
        messageSController(agServer, socket, 'connection');
    }

    for await (let { socket } of agServer.listener('disconnection')) {
        console.log('Socket on disconnection')
    }

    for await (let { error } of agServer.listener('error')) {
        console.log('Socket on error')
    }

    for await (let { warning } of agServer.listener('warning')) {
        console.log('Socket on warning')
    }

    for await (let { socket } of agServer.listener('handshake')) {
        console.log('Socket on handshake')
    }

    for await (let { socket } of agServer.listener('authenticationStateChange')) {
        console.log('Socket on authenticationStateChange')
    }

    for await (let { socket } of agServer.listener('authentication')) {
        console.log('Socket on authentication')
    }

    for await (let { socket } of agServer.listener('deauthentication')) {
        console.log('Socket on deauthentication')
    }

    for await (let { socket } of agServer.listener('badSocketAuthToken')) {
        console.log('Socket on badSocketAuthToken')
    }

    for await (let { socket } of agServer.listener('connection')) {
        console.log('Socket on connection')
    }

    for await (let { socket } of agServer.listener('subscription')) {
        console.log('Socket on subscription')
    }

    for await (let { socket } of agServer.listener('unsubscription')) {
        console.log('Socket on unsubscription')
    }

    for await (let { socket } of agServer.listener('connectionAbort')) {
        console.log('Socket on connectionAbort')
    }

    for await (let { socket } of agServer.listener('disconnection')) {
        console.log('Socket on disconnection')
    }

    for await (let { socket } of agServer.listener('closure')) {
        console.log('Socket on closure')
    }

}