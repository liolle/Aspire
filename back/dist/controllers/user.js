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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = exports.logout = exports.register = exports.login = void 0;
const users_1 = require("../models/users");
const Type = __importStar(require("../utils/types"));
const token_1 = require("../utils/token");
const node_fetch_1 = __importDefault(require("node-fetch"));
// import { Tags } from "../models/tags";
const attachToken = (payload, res) => {
    const accessToken = (0, token_1.signJWT)(payload, process.env.ACCESS_TOKEN_TTL || '1d');
    // res.cookie("ASP_AT",accessToken,{maxAge:24*60*60*1000 ,sameSite:"none",secure:true})
    res.cookie("ASP_AT", accessToken, { maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });
};
const login = async (req, res) => {
    let { u_tag } = req.params;
    let { token } = req.body;
    if (!token) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {}
        });
    }
    let FBresponse = await (0, node_fetch_1.default)(`https://graph.facebook.com/v16.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${token}`);
    let data = await FBresponse.json();
    console.log(`https://graph.facebook.com/v16.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${token}`);
    if ("error" in data) {
        res.status(400).json({
            status: 100,
            message: Type.StatusTypes[100],
            content: data.error.message
        });
        return;
    }
    console.log(data);
    let user = new users_1.User();
    let response = await user.login(data.email, token);
    user.close();
    if (response.status != 100) {
        res.status(400).json({
            status: response.status,
            message: response.message,
            content: response.content
        });
        return;
    }
    attachToken({
        email: data.email,
        session_id: response.content.session_id
    }, res);
    const accessToken = (0, token_1.signJWT)({
        email: data.email,
        session_id: response.content.session_id
    }, process.env.ACCESS_TOKEN_TTL || '1d');
    res.cookie("ASP_AT", accessToken, { maxAge: 24 * 60 * 60 * 1000, sameSite: "none" });
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: accessToken
    });
};
exports.login = login;
const register = async (req, res) => {
    let { u_tag } = req.params;
    let { token, email } = req.body;
    if (!email) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {}
        });
    }
    let user = new users_1.User();
    let response = await user.register(email, token);
    user.close();
    if (response.status != 100) {
        res.status(400).json({
            status: response.status,
            message: response.message,
            content: response.content
        });
        return;
    }
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: response
    });
};
exports.register = register;
const logout = async (req, res) => {
    // erase cookie 
    let user = new users_1.User();
    let resp = await user.logout(req.params.email);
    user.close();
    if (resp.status != 100) {
        res.status(400).json({
            status: resp.status,
            message: resp.message,
            content: resp.content
        });
        return;
    }
    // res.clearCookie("ASP_AT")
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.logout = logout;
const ping = async (req, res) => {
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.ping = ping;
