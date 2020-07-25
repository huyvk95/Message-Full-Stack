"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
/* INSTANCE */
let router = express_1.Router();
/* HOME */
router.get('/', function (req, res) {
    res.status(200).send('OK');
});
/* API */
router.use('/auth', AuthRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map