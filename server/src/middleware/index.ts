import * as auth from "./AuthMiddleware";
import * as data from "./DataMiddleware";

let middleware = {
    auth,
    data
}

export default middleware;