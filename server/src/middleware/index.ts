import { 
    middlewareAuth as checkAuth, 
    middlewareResponse as response 
} from "./CommonMiddleware";

let middleware = {
    checkAuth,
    response
}

export default middleware;