declare namespace Express {
    interface Request {
        user?: any;
        t: (key: string) => string
        language: string,
        languages: string[],
        i18n: {
            changeLanguage: (lang: string) => void
        }
    }
    interface Response {
        data?: any;
        message?: string;
    }
}