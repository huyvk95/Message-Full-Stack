import express from "express";
import http from "http";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import router from "./router";
import mongoose from "mongoose";
import connectRedis from "connect-redis";
import expressSession from "express-session";
import cors from "cors";
import i18next from "i18next";
import socketClusterServer from "socketcluster-server";
import { createClient } from "redis";
import { i18nextConfig, expressSessionConfig, socketClusterConfig } from "./config";
import socketInit from "./socket";
let i18nextBackend = require('i18next-fs-backend')
let i18nextMiddleware = require('i18next-http-middleware')

/* __INSTANCE__ */
let app = express();
let httpServer = http.createServer(app);
let redis = createClient()
let RedisStore = connectRedis(expressSession)
let sessionStore = new RedisStore({ client: redis })
let agServer = socketClusterServer.attach(httpServer, socketClusterConfig)

/* __CONFIG__ */
i18next
    .use(i18nextBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init(i18nextConfig)

/* __MIDDLE_WARE__ */
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession(expressSessionConfig(sessionStore)))
app.use(i18nextMiddleware.handle(i18next))
mongoose.connect(process.env.DATABASE as string, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });

/* __ROUTER__ */
app.use('/', router);

/* __SERVER_START__ */
let listenner = httpServer.listen(process.env.PORT, () => {
    console.log('Server start at port: ', (listenner.address() as any).port)
});

/* __SOCKET_CLUSTER__ */
socketInit(agServer)