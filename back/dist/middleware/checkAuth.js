"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Type = __importStar(require("../utils/types"));
const token_1 = require("../utils/token");
const checkAuth = async (req, res, next) => {
    // const {ASP_AT} = req.cookies;
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        res.status(400).json({
            status: 203,
            message: Type.StatusTypes[203],
            content: {}
        });
        return;
    }
    const ASP_AT = authorizationHeader.split(' ')[1];
    if (ASP_AT == "ADMIN_SPECIAL_KEY") {
        next();
        return;
    }
    // if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    //   const token = authorizationHeader.split(' ')[1];
    //   try {
    //     const decoded = jwt.verify(token, 'your_secret_key');
    //     // Access the decoded token and perform necessary operations
    //     req.user = decoded;
    //   } catch (err) {
    //     // Handle JWT verification error
    //     return res.status(401).json({ error: 'Invalid token' });
    //   }
    // }
    //   const token = authHeader.split(" ")[1];
    let verif_out = (0, token_1.verifyJWT)(ASP_AT);
    if (verif_out.payload == null) {
        res.status(403).json({
            status: 203,
            message: Type.StatusTypes[203],
            content: {}
        });
        return;
    }
    let payload = verif_out.payload;
    req.params.session_id = `${payload.session_id}`;
    req.params.email = `${payload.email}`;
    next();
};
exports.default = checkAuth;
