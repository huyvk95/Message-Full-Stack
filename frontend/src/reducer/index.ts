import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import AppReducer from "./AppReducer";
import NavigationReducer from "./NavigationReducer";
import FriendReducer from "./FriendReducer";
import FriendRequestReducer from "./FriendRequestReducer";
import ChatroomReducer from "./ChatroomReducer";
import MessageReducer from "./MessageReducer";
import TypingReducer from "./TypingReducer";

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