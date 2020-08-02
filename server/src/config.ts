import { InitOptions } from "i18next";
import { SessionOptions, Store, MemoryStore } from "express-session";
import { AGServerOptions } from "socketcluster-server/server";

export const socketClusterConfig: AGServerOptions = {
    authKey: process.env.SECRET_KEY,
}

export const i18nextConfig: InitOptions = {
    backend: {
        loadPath: process.cwd() + '/lang/{{lng}}.json',
    },
    fallbackLng: 'en',
    preload: ["en", "vi"],
    detection: {
        lookupHeader: 'accept-language',
    }
}

export const expressSessionConfig: (store: Store | MemoryStore) => SessionOptions = (store) => ({
    secret: process.env.SECRET_SESSION as string,
    resave: true,
    saveUninitialized: false,
    cookie: { expires: new Date(Date.now() + 60 * 60 * 1000) },
    store: store,
})