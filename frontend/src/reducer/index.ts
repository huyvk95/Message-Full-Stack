import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import AppReducer from "./AppReducer";

const reducer = combineReducers({
    user: UserReducer,
    app: AppReducer
})

export default reducer;