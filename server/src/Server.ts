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
import { createClient } from "redis";

/* __INSTANCE__ */
let app = express();
let server = http.createServer(app);
let redis = createClient()
let RedisStore = connectRedis(expressSession)
let sessionStore = new RedisStore({ client: redis })

/* __MIDDLE_WARE__ */
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession({
    secret: process.env.SECRET_SESSION as string,
    resave: true,
    saveUninitialized: false,
    cookie: { expires: new Date(Date.now() + 60 * 60 * 1000) },
    store: sessionStore,
}))
mongoose.connect(process.env.DATABASE as string, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });

/* __ROUTER__ */
app.use('/', router)

/* __SERVER_START__ */
let listenner = server.listen(process.env.PORT, () => {
    console.log('Server start at port: ', (listenner.address() as any).port)
})