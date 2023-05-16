import { Request, Response } from "express";
import { User } from "../models/users";
import * as Type from "../utils/types";
import { signJWT } from "../utils/token";
import fetch from "node-fetch";
import { Profiles } from "../models/profiles";
// import { Tags } from "../models/tags";

const hexColorPattern = /([0-9a-fA-F]{3}){1,2}$/

export const add = async (req: Request, res: Response)=>{

    console.log(req.query)
    console.log(req.params)

    let account_email = req.params.email 
    let model_email = req.query.email 

    if (!model_email) model_email = account_email

    let models = new Profiles
    let response = await models.add(account_email,model_email as string)
    models.close()

    if (response.status != 100){
        res.status(400).json({
            status:response.status,
            message:response.message,
            content: response.content
        })
        return
    }
    

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )
}

export const getAll = async (req: Request, res: Response)=>{

    let models = new Profiles

    let response = await models.getAll(req.params.email)

    if (response.status != 100){
        res.status(400).json({
            status:response.status,
            message:response.message,
            content: response.content
        })
        return
    }
    
    models.close()
    
    
    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: response.content
        }
    )
}

export const get = async (req: Request, res: Response)=>{

    let models = new Profiles

    let {id} = req.params
    let p_id = parseInt(id)

    if (isNaN(p_id)){
        res.status(400).json({
            status:401,
            message:Type.StatusTypes[401],
            content: id
        })
        return
    }

    let response = await models.get(p_id)

    if (response.status != 100){
        res.status(400).json({
            status:response.status,
            message:response.message,
            content: response.content
        })
        return
    }
    
    models.close()
    
    
    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: response.content
        }
    )
}

export const del = async (req: Request, res: Response)=>{

    let models = new Profiles

    let {id} = req.params
    let p_id = parseInt(id)

    if (isNaN(p_id)){
        res.status(400).json({
            status:401,
            message:Type.StatusTypes[401],
            content: id
        })
        return
    }

    let response = await models.delete(p_id)

    if (response.status != 100){
        res.status(400).json({
            status:response.status,
            message:response.message,
            content: response.content
        })
        return
    }
    
    models.close()
    
    
    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: response.content
        }
    )
}

export const setHeight = async (req: Request, res: Response)=>{
    
    let {id,value} = req.params
    let p_id = parseInt(id)
    let p_value = parseInt(value)
    
    if (isNaN(p_id) ||isNaN(p_value)){
        
        let c:any[] = []
        isNaN(p_id) && c.push(p_id)
        isNaN(p_value) && c.push(p_value)
        res.status(400).json({
            status:401,
            message:Type.StatusTypes[401],
            content: c
        })
        return
    }
    
    let models = new Profiles
    let response = await models.setHeight(p_id,p_value)
    models.close()
    
    if (response.status != 100){
        res.status(400).json({
            status:response.status,
            message:response.message,
            content: response.content
        })
        return
    }
    
    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: response.content
        }
    )
}

export const setWeight = async (req: Request, res: Response)=>{
    
    let {id,value} = req.params
    let p_id = parseInt(id)
    let p_value = parseInt(value)

    if (isNaN(p_id) ||isNaN(p_value)){

        let c:any[] = []
        isNaN(p_id) && c.push(p_id)
        isNaN(p_value) && c.push(p_value)
        res.status(400).json({
            status:401,
            message:Type.StatusTypes[401],
            content: c
        })
        return
    }
    
    let models = new Profiles
    let response = await models.setWeight(p_id,p_value)
    models.close()

    if (response.status != 100){
        res.status(400).json({
            status:response.status,
            message:response.message,
            content: response.content
        })
        return
    }
    
    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: response.content
        }
    )
}

export const setHairColor = async (req: Request, res: Response)=>{
    

    let {id,value} = req.params
    let p_id = parseInt(id)

    if (!value){
        res.status(400).json({
            status:400,
            message:Type.StatusTypes[400],
            content: "value"
        })
        return
    }

    if (!hexColorPattern.test(value)){
        res.status(400).json({
            status:401,
            message:Type.StatusTypes[401],
            content: value
        })
        return
    }

    if (isNaN(p_id) ){
        let c:any[] = []
        isNaN(p_id) && c.push(p_id)
        res.status(400).json({
            status:401,
            message:Type.StatusTypes[401],
            content: c
        })
        return
    }

    let models = new Profiles
    let response = await models.setHairColor(p_id,value)
    models.close()

    if (response.status != 100){
        res.status(400).json({
            status:response.status,
            message:response.message,
            content: response.content
        })
        return
    }
    
    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: response.content
        }
    )
}

export const setSkinColor = async (req: Request, res: Response)=>{

    let {id,value} = req.params
    let p_id = parseInt(id)

    if (!value){
        res.status(400).json({
            status:400,
            message:Type.StatusTypes[400],
            content: "value"
        })
        return
    }

    if (!hexColorPattern.test(value)){
        res.status(400).json({
            status:401,
            message:Type.StatusTypes[401],
            content: value
        })
        return
    }

    if (isNaN(p_id) ){
        let c:any[] = []
        isNaN(p_id) && c.push(p_id)
        res.status(400).json({
            status:401,
            message:Type.StatusTypes[401],
            content: c
        })
        return
    }

    let models = new Profiles
    let response = await models.setSkinColor(p_id,value)
    models.close()

    if (response.status != 100){
        res.status(400).json({
            status:response.status,
            message:response.message,
            content: response.content
        })
        return
    }
    
    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: response.content
        }
    )
}