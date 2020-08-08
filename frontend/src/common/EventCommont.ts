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
        GETFRIENDREQUEST: "getFriendRequest",
        SENDFRIENDREQUEST: "sendFriendRequest",
        ACCEPTFRIENDREQUEST: "acceptFriendRequest",
        REFUSEFRIENDREQUEST: "refuseFriendRequest",
        CANCELFRIENDREQUEST: "cancelFriendRequest",
        // TRAMSMIT EVENT
        RECEIVEFRIENDREQUEST: "receiveFriendRequest",
        REMOVEFRIENDREQUEST: "removeFriendRequest",
        ONACCEPTFRIENDREQUEST: "onAcceptFriendRequest",
        ONREMOVEFRIEND: "onRemoveFriend",
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