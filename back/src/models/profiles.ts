import DbConnect from "../utils/dbConnect";
import fetch from 'node-fetch';

import * as Type from "../utils/types";
import { Session } from "./sessions";

export class Profiles extends DbConnect {


    constructor(){
        super();
    }

    async add (account_email:string,model_email:string){
        const get_query = `
        INSERT INTO ma_models (account_email,model_email)
        VALUE('${account_email}','${model_email}')
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(get_query, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: err
                    })
                    return 
                }

                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                })
            })
        })
    }

    async getAll (in_email:string)  {
        const get_query = `
        SELECT * FROM ma_models 
        WHERE account_email = '${in_email}'
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(get_query, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: err
                    })
                    return 
                }

                let output:any[] = []
                for (let elem of rows){
                    let lg_response = await this.getLG_HB(elem["id"],"ma_modellangages")
                    var languages = lg_response.status == 100 ? lg_response.content : []  
                    let hb_response = await this.getLG_HB(elem["id"],"ma_modelhobbies")
                    var hobbies:any[] = hb_response.status == 100 ? hb_response.content : []
                    
                    output.push({
                        id:elem["id"],
                        model_email:elem["model_email"],
                        weight:elem["weight"],
                        height:elem["height"],
                        hairColor:elem["c_hair"],
                        skinColor:elem["c_skin"],
                        languages:languages,
                        hobbies:hobbies
                    })
                }


                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: output
                })
            })
        })
    }

    async getLG_HB (in_id:number,table:"ma_modellangages"|"ma_modelhobbies")  {
        const lang_query = `
        SELECT * FROM ${table}  
        WHERE model_id = '${in_id}'
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(lang_query, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: err
                    })
                    return 
                }

                let output:any[] = []
                if (table == "ma_modellangages"){
                    for (let elem of rows){
                        output.push({
                            name:elem["name"],
                            level:elem["level"]
                        })
                    }
                }
                else{
                    for (let elem of rows){
                        output.push({
                            name:elem["name"],
                            description:elem["description"]
                        })
                    }
                }

                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: output
                })
            })
        })
    }

    async get (in_id:number)  {
        const get_query = `
        SELECT * FROM ma_models 
        WHERE id = '${in_id}'
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(get_query, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: err
                    })
                    return 
                }

                let output:any[] = []
                for (let elem of rows){
                    let lg_response = await this.getLG_HB(elem["id"],"ma_modellangages")
                    var languages = lg_response.status == 100 ? lg_response.content : []  
                    let hb_response = await this.getLG_HB(elem["id"],"ma_modelhobbies")
                    var hobbies:any[] = hb_response.status == 100 ? hb_response.content : []
                    
                    output.push({
                        id:elem["id"],
                        model_email:elem["model_email"],
                        weight:elem["weight"],
                        height:elem["height"],
                        hairColor:elem["c_hair"],
                        skinColor:elem["c_skin"],
                        languages:languages,
                        hobbies:hobbies
                    })
                }

                

                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: output.length == 0 ? {}:output[0]
                })
            })
        })
    }

    async delete (in_id:number)  {
        const get_query = `
        DELETE FROM ma_models 
        WHERE id = '${in_id}'
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(get_query, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: err
                    })
                    return 
                }



                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                })
            })
        })
    }

    async setHairColor (in_id:number,color:string)  {
        const get_query = `
        UPDATE ma_models
        SET c_hair = '#${color}'
        WHERE id = '${in_id}'
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(get_query, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: err
                    })
                    return 
                }



                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                })
            })
        })
    }

    async setSkinColor (in_id:number,color:string)  {
        const get_query = `
        UPDATE ma_models
        SET c_skin = '#${color}'
        WHERE id = '${in_id}'
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(get_query, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: err
                    })
                    return 
                }



                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                })
            })
        })
    }

    async setHeight (in_id:number,height:number)  {
        const get_query = `
        UPDATE ma_models
        SET height = '${height}'
        WHERE id = '${in_id}'
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(get_query, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: err
                    })
                    return 
                }



                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                })
            })
        })
    }

    async setWeight (in_id:number,weight:number)  {
        const get_query = `
        UPDATE ma_models
        SET weight = '${weight}'
        WHERE id = '${in_id}'
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(get_query, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: err
                    })
                    return 
                }



                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                })
            })
        })
    }



}