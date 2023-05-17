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
exports.Session = void 0;
const dbConnect_1 = __importDefault(require("../utils/dbConnect"));
const Type = __importStar(require("../utils/types"));
class Session extends dbConnect_1.default {
    constructor() {
        super();
    }
    // getSession(session_id:number){
    //     //
    //     let sql_add_session = `
    //     SELECT S.id, S.user_id, T.tag FROM bf_sessions S
    //     left join bf_tags T on T.context_id = S.user_id 
    //     WHERE S.id = ${session_id}
    //     `
    //     return new Promise<Type.ResponseMsg>((resolve, reject) => {
    //         this.connection.query(sql_add_session, async (err:any, rows:any, fields:any)=>{
    //             if (err){
    //                 resolve({
    //                     status:202,
    //                     message:Type.StatusTypes[202],
    //                     content: {error: err}
    //                 })
    //                 return 
    //             }
    //             if (rows.length == 0){
    //                 resolve({
    //                     status:201,
    //                     message: Type.StatusTypes[201],
    //                     content: {}
    //                 })
    //                 return
    //             }
    //             resolve({
    //                 status:100,
    //                 message:Type.StatusTypes[100],
    //                 content: rows
    //             })
    //         })
    //     })
    // } 
    getSession(email) {
        //
        let sql_add_session = `
        SELECT * FROM ma_sessions
        WHERE email = '${email}'
        
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql_add_session, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: { error: err }
                    });
                    return;
                }
                if (rows.length == 0) {
                    resolve({
                        status: 201,
                        message: Type.StatusTypes[201],
                        content: {}
                    });
                    return;
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {
                        email: rows[0]['email'],
                        session_id: rows[0]['id'],
                        token: rows[0]['Token']
                    }
                });
            });
        });
    }
    addSession(email, token) {
        let sql_add_session = `
        INSERT INTO ma_sessions (email, Token)
        VALUES('${email}','${token}')
        ON DUPLICATE KEY UPDATE Token='${token}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql_add_session, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: { error: err }
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
    deleteSession(email) {
        let sql_del_session = `
        DELETE FROM ma_sessions 
        WHERE email = '${email}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql_del_session, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: { error: err }
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
}
exports.Session = Session;
