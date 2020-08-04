const event = {
    USER: {
        GET: "get",
    },
    PROFILE: {
        GET: "get",
        PUT: "put",
        REMOVE: "remove",
    },
    FRIEND: {
        GET: "get",
        SETNICKNAME: "setNickName",
        REMOVE: "remove",
        SENDFRIENDREQUEST: "sendFriendRequest",
        ACCEPTFRIENDREQUEST: "acceptFriendRequest",
        REFUSEFRIENDREQUEST: "refuseFriendRequest",
        CANCELFRIENDREQUEST: "cancelFriendRequest",
    },
    CHATROOM: {
        CREATE: "create",
        UNFOLLOW: "unfollow",
        INVITE: "invite",
        GETALLUSERCHATROOMS: "getAllUserChatrooms"
    },
    MESSAGE: {},
}

export default event;