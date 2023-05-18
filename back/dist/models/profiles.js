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
exports.Profiles = void 0;
const dbConnect_1 = __importDefault(require("../utils/dbConnect"));
const Type = __importStar(require("../utils/types"));
class Profiles extends dbConnect_1.default {
    constructor() {
        super();
    }
    async add(account_email, model_email) {
        const get_query = `
        INSERT INTO ma_models (account_email,model_email)
        VALUES ('${account_email}','${model_email}')
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(get_query, async (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: err
                    });
                    return;
                }
                let last_id_query = `
                SELECT LAST_INSERT_ID() AS id;
                `;
                this.connection.query(last_id_query, async (err, rows, fields) => {
                    console.log(rows);
                    resolve({
                        status: 100,
                        message: Type.StatusTypes[100],
                        content: rows[0]['id'] || 0
                    });
                });
            });
        });
    }
    async getAll(in_email) {
        const get_query = `
        SELECT * FROM ma_models 
        WHERE account_email = '${in_email}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(get_query, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: err
                    });
                    return;
                }
                let output = [];
                for (let elem of rows) {
                    let lg_response = await this.getLG_HB(elem["id"], "ma_modellangages");
                    var languages = lg_response.status == 100 ? lg_response.content : [];
                    let hb_response = await this.getLG_HB(elem["id"], "ma_modelhobbies");
                    var hobbies = hb_response.status == 100 ? hb_response.content : [];
                    output.push({
                        id: elem["id"],
                        model_email: elem["model_email"],
                        weight: elem["weight"],
                        height: elem["height"],
                        hairColor: elem["c_hair"],
                        skinColor: elem["c_skin"],
                        languages: languages,
                        hobbies: hobbies
                    });
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: output
                });
            });
        });
    }
    async getLG_HB(in_id, table) {
        const lang_query = `
        SELECT * FROM ${table}  
        WHERE model_id = '${in_id}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(lang_query, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: err
                    });
                    return;
                }
                let output = [];
                if (table == "ma_modellangages") {
                    for (let elem of rows) {
                        output.push({
                            name: elem["name"],
                            level: elem["level"]
                        });
                    }
                }
                else {
                    for (let elem of rows) {
                        output.push({
                            name: elem["name"],
                            description: elem["description"]
                        });
                    }
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: output
                });
            });
        });
    }
    async get(in_id) {
        const get_query = `
        SELECT * FROM ma_models 
        WHERE id = '${in_id}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(get_query, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: err
                    });
                    return;
                }
                let output = [];
                for (let elem of rows) {
                    let lg_response = await this.getLG_HB(elem["id"], "ma_modellangages");
                    var languages = lg_response.status == 100 ? lg_response.content : [];
                    let hb_response = await this.getLG_HB(elem["id"], "ma_modelhobbies");
                    var hobbies = hb_response.status == 100 ? hb_response.content : [];
                    output.push({
                        id: elem["id"],
                        model_email: elem["model_email"],
                        weight: elem["weight"],
                        height: elem["height"],
                        hairColor: elem["c_hair"],
                        skinColor: elem["c_skin"],
                        languages: languages,
                        hobbies: hobbies
                    });
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: output.length == 0 ? {} : output[0]
                });
            });
        });
    }
    async delete(in_id) {
        const get_query = `
        DELETE FROM ma_models 
        WHERE id = '${in_id}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(get_query, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: err
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
    async setHairColor(in_id, color) {
        const get_query = `
        UPDATE ma_models
        SET c_hair = '#${color}'
        WHERE id = '${in_id}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(get_query, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: err
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
    async setSkinColor(in_id, color) {
        const get_query = `
        UPDATE ma_models
        SET c_skin = '#${color}'
        WHERE id = '${in_id}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(get_query, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: err
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
    async setHeight(in_id, height) {
        const get_query = `
        UPDATE ma_models
        SET height = '${height}'
        WHERE id = '${in_id}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(get_query, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: err
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
    async setWeight(in_id, weight) {
        const get_query = `
        UPDATE ma_models
        SET weight = '${weight}'
        WHERE id = '${in_id}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(get_query, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: err
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
exports.Profiles = Profiles;
