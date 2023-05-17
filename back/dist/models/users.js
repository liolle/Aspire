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
exports.User = void 0;
const dbConnect_1 = __importDefault(require("../utils/dbConnect"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const Type = __importStar(require("../utils/types"));
const sessions_1 = require("./sessions");
class User extends dbConnect_1.default {
    constructor() {
        super();
    }
    async get(email) {
        let sql_get = `
        SELECT * FROM ma_users
        WHERE email = '${email}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql_get, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: err
                    });
                    return;
                }
                if (rows.length == 0) {
                    resolve({
                        status: 201,
                        message: Type.StatusTypes[201],
                        content: email
                    });
                    return;
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {}
                });
            });
        });
    }
    async add(email) {
        let sql_get = `
        INSERT INTO ma_users (email)
        VALUES ('${email}')
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql_get, async (err, rows, fields) => {
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') {
                        resolve({
                            status: 200,
                            message: Type.StatusTypes[200],
                            content: email
                        });
                        return;
                    }
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: err
                    });
                    return;
                }
                if (rows.length == 0) {
                    resolve({
                        status: 201,
                        message: Type.StatusTypes[201],
                        content: email
                    });
                    return;
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {}
                });
            });
        });
    }
    async login(in_email, in_token) {
        return new Promise(async (resolve, reject) => {
            let get_response = await this.get(in_email);
            if (get_response.status != 100) {
                resolve({
                    status: get_response.status,
                    message: get_response.message,
                    content: in_email
                });
                return;
            }
            let session = new sessions_1.Session();
            let response = await session.addSession(in_email, in_token);
            if (response.status != 100) {
                resolve({
                    status: response.status,
                    message: response.message,
                    content: response.content
                });
                session.close();
                return;
            }
            response = await session.getSession(in_email);
            if (response.status != 100) {
                resolve({
                    status: response.status,
                    message: response.message,
                    content: response.content
                });
                session.close();
                return;
            }
            session.close();
            resolve({
                status: 100,
                message: Type.StatusTypes[100],
                content: { session_id: response.content.session_id }
            });
            // Create a session using email and token 
        });
    }
    async register(in_email, in_token) {
        return new Promise(async (resolve, reject) => {
            let options = { method: 'POST' };
            let resp = await (0, node_fetch_1.default)(`https://graph.facebook.com/v16.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${in_token}`);
            let data = await resp.json();
            let { error, email, name, id } = data;
            if (!!error) {
                resolve({
                    status: 401,
                    message: Type.StatusTypes[401],
                    content: error["message"]
                });
                return;
            }
            if (in_email != email) {
                resolve({
                    status: 401,
                    message: Type.StatusTypes[401],
                    content: in_email
                });
                return;
            }
            let get_response = await this.add(in_email);
            if (get_response.status != 100) {
                resolve({
                    status: get_response.status,
                    message: get_response.message,
                    content: get_response.content
                });
                return;
            }
            resolve({
                status: 100,
                message: Type.StatusTypes[100],
                content: {}
            });
            // Create a session using email and token 
        });
    }
    //logout based on JWT
    async logout(in_email) {
        return new Promise(async (resolve, reject) => {
            let session = new sessions_1.Session();
            let Sresponse = await session.getSession(in_email);
            let { token } = Sresponse.content;
            (0, node_fetch_1.default)(`https://graph.facebook.com/v12.0/me/permissions?access_token=${token}`, {
                method: 'DELETE'
            });
            let response = await session.deleteSession(in_email);
            if (response.status != 100) {
                resolve({
                    status: response.status,
                    message: response.message,
                    content: response.content
                });
                session.close();
                return;
            }
            session.close();
            resolve({
                status: 100,
                message: Type.StatusTypes[100],
                content: {}
            });
        });
    }
}
exports.User = User;
