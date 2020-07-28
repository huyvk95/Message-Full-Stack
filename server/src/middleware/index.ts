import { 
    middlewareAuth as checkAuth, 
    middlewareResponse as response,
    middlewareValidator as validator
} from "./CommonMiddleware";

let middleware = {
    checkAuth,
    response,
    validator,
}

export default middleware;