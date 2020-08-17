import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

store.subscribe(()=>console.log('%cStore','color: #1e88e5',store.getState()))

export default store;