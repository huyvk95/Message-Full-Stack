declare namespace Express {
    interface Request {
        user?: any;
    }
    interface Response {
        data?: any;
        message?: string;
    }
}