"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const checkAuth_1 = __importDefault(require("../middleware/checkAuth"));
const consumeToken_1 = __importDefault(require("../middleware/consumeToken"));
const router = express_1.default.Router();
// import { login, auth } from '../controllers/login';
// import verifyJwt from '../middlewares/auth';
router.post('/register', user_1.register);
router.post('/login', consumeToken_1.default, user_1.login);
router.post('/logout', checkAuth_1.default, user_1.logout);
router.post('/auth', checkAuth_1.default, user_1.ping);
module.exports = router;
