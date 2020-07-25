"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* INSTANCE */
let router = express_1.Router();
/* HOME */
router.get('/', function (req, res) { console.log('OK'); });
exports.default = router;
//# sourceMappingURL=AuthApi.js.map