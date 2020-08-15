import { combineReducers } from "redux";
import UserReducer from "./reducer.user";
import AppReducer from "./reducer.app";
import NavigationReducer from "./reducer.navigation";
import FriendReducer from "./reducer.friend";
import FriendRequestReducer from "./reducer.friendrequest";
import ChatroomReducer from "./reducer.chatroom";
import MessageReducer from "./reducer.message";
import TypingReducer from "./reducer.typing";

const reducer = combineReducers({
    user: UserReducer,
    app: AppReducer,
    navigation: NavigationReducer,
    friend: FriendReducer,
    friendRequest: FriendRequestReducer,
    chatroom: ChatroomReducer,
    message: MessageReducer,
    typing: TypingReducer,
})

export default reducer;