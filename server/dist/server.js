"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
/* __INSTANCE__ */
let app = express_1.default();
let server = http_1.default.createServer(app);
let redis = redis_1.createClient();
let RedisStore = connect_redis_1.default(express_session_1.default);
let sessionStore = new RedisStore({ client: redis });
/* __MIDDLE_WARE__ */
app.use(helmet_1.default());
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: false,
    cookie: { expires: new Date(Date.now() + 60 * 60 * 1000) },
    store: sessionStore,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
mongoose_1.default.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
/* __ROUTER__ */
app.use('/', router_1.default);
/* __SERVER_START__ */
let listenner = server.listen(process.env.PORT, () => {
    console.log('Server start at port: ', listenner.address().port);
});
//# sourceMappingURL=Server.js.map