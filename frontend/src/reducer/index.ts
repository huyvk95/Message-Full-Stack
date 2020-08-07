import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import AppReducer from "./AppReducer";
import NavigationReducer from "./NavigationReducer";
import FriendReducer from "./FriendReducer";

const reducer = combineReducers({
    user: UserReducer,
    app: AppReducer,
    navigation: NavigationReducer,
    friend: FriendReducer,
})

export default reducer;