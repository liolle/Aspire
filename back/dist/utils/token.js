"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// sign jwt
function signJWT(payload, expiresIn) {
    return jsonwebtoken_1.default.sign(payload, process.env.PRIVATE_KEY, { algorithm: "RS256", expiresIn: expiresIn });
}
exports.signJWT = signJWT;
// verify jwt
function verifyJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.PUBLIC_KEY);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        //@ts-ignore
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}
exports.verifyJWT = verifyJWT;
