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
exports.setSkinColor = exports.setHairColor = exports.setWeight = exports.setHeight = exports.del = exports.get = exports.getAll = exports.add = void 0;
const Type = __importStar(require("../utils/types"));
const profiles_1 = require("../models/profiles");
// import { Tags } from "../models/tags";
const hexColorPattern = /([0-9a-fA-F]{3}){1,2}$/;
const add = async (req, res) => {
    console.log(req.query);
    console.log(req.params);
    let account_email = req.params.email;
    let model_email = req.query.email;
    if (!model_email)
        model_email = account_email;
    let models = new profiles_1.Profiles;
    let response = await models.add(account_email, model_email);
    models.close();
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
        content: response.content
    });
};
exports.add = add;
const getAll = async (req, res) => {
    let models = new profiles_1.Profiles;
    let response = await models.getAll(req.params.email);
    if (response.status != 100) {
        res.status(400).json({
            status: response.status,
            message: response.message,
            content: response.content
        });
        return;
    }
    models.close();
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: response.content
    });
};
exports.getAll = getAll;
const get = async (req, res) => {
    let models = new profiles_1.Profiles;
    let { id } = req.params;
    let p_id = parseInt(id);
    if (isNaN(p_id)) {
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: id
        });
        return;
    }
    let response = await models.get(p_id);
    if (response.status != 100) {
        res.status(400).json({
            status: response.status,
            message: response.message,
            content: response.content
        });
        return;
    }
    models.close();
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: response.content
    });
};
exports.get = get;
const del = async (req, res) => {
    let models = new profiles_1.Profiles;
    let { id } = req.params;
    let p_id = parseInt(id);
    if (isNaN(p_id)) {
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: id
        });
        return;
    }
    let response = await models.delete(p_id);
    if (response.status != 100) {
        res.status(400).json({
            status: response.status,
            message: response.message,
            content: response.content
        });
        return;
    }
    models.close();
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: response.content
    });
};
exports.del = del;
const setHeight = async (req, res) => {
    let { id, value } = req.params;
    let p_id = parseInt(id);
    let p_value = parseInt(value);
    if (isNaN(p_id) || isNaN(p_value)) {
        let c = [];
        isNaN(p_id) && c.push(p_id);
        isNaN(p_value) && c.push(p_value);
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: c
        });
        return;
    }
    let models = new profiles_1.Profiles;
    let response = await models.setHeight(p_id, p_value);
    models.close();
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
        content: response.content
    });
};
exports.setHeight = setHeight;
const setWeight = async (req, res) => {
    let { id, value } = req.params;
    let p_id = parseInt(id);
    let p_value = parseInt(value);
    if (isNaN(p_id) || isNaN(p_value)) {
        let c = [];
        isNaN(p_id) && c.push(p_id);
        isNaN(p_value) && c.push(p_value);
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: c
        });
        return;
    }
    let models = new profiles_1.Profiles;
    let response = await models.setWeight(p_id, p_value);
    models.close();
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
        content: response.content
    });
};
exports.setWeight = setWeight;
const setHairColor = async (req, res) => {
    let { id, value } = req.params;
    let p_id = parseInt(id);
    if (!value) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: "value"
        });
        return;
    }
    if (!hexColorPattern.test(value)) {
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: value
        });
        return;
    }
    if (isNaN(p_id)) {
        let c = [];
        isNaN(p_id) && c.push(p_id);
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: c
        });
        return;
    }
    let models = new profiles_1.Profiles;
    let response = await models.setHairColor(p_id, value);
    models.close();
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
        content: response.content
    });
};
exports.setHairColor = setHairColor;
const setSkinColor = async (req, res) => {
    let { id, value } = req.params;
    let p_id = parseInt(id);
    if (!value) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: "value"
        });
        return;
    }
    if (!hexColorPattern.test(value)) {
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: value
        });
        return;
    }
    if (isNaN(p_id)) {
        let c = [];
        isNaN(p_id) && c.push(p_id);
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: c
        });
        return;
    }
    let models = new profiles_1.Profiles;
    let response = await models.setSkinColor(p_id, value);
    models.close();
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
        content: response.content
    });
};
exports.setSkinColor = setSkinColor;
