import DbConnect from "../utils/dbConnect";

import fetch from 'node-fetch';

import * as Type from "../utils/types";
import { Session } from "./sessions";

export class User extends DbConnect {


    constructor(){
        super();
        
    }

    private async get(email:string,service:Type.SServices){
        let sql_get = `
        SELECT * FROM ma_users
        WHERE email = '${email}' AND c_type = '${service}'
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(sql_get, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: err
                    })
                    return 
                }

                if (rows.length == 0){
                    
                    resolve({
                        status:201,
                        message:Type.StatusTypes[201],
                        content: email
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


    private async add(email:string,service:Type.SServices){
        let sql_get = `
        INSERT INTO ma_users (email,c_type)
        VALUES ('${email}','${service}')
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(sql_get, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    if(err.code == 'ER_DUP_ENTRY'){
                        resolve({
                            status:200,
                            message:Type.StatusTypes[200],
                            content: err
                        })
                        return 
                    }

                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: err
                    })
                    return 
                }

                if (rows.length == 0){
                    
                    resolve({
                        status:201,
                        message:Type.StatusTypes[201],
                        content: email
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


    async login(in_email:string, info:Type.CInfo ){
        
        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {
            
            let get_response = await this.get(in_email,info.service)
            if (get_response.status != 100){
                console.log("=>"+info.service);
                
                resolve({
                    status:get_response.status,
                    message:get_response.message,
                    content: get_response.content
                })
                return
            }

            let session = new Session()
            let response = await session.addSession(in_email,info.token)
            
            if (response.status != 100){
                resolve(
                    {
                        status:response.status,
                        message:response.message,
                        content: response.content
                    }
                )
                session.close()
                return
            }

            response = await session.getSession(in_email)
            if (response.status != 100){
                resolve(
                    {
                        status:response.status,
                        message:response.message,
                        content: response.content
                    }
                )
                session.close()
                return
            }

            session.close()

            resolve({
                status:100,
                message:Type.StatusTypes[100],
                content: {session_id: response.content.session_id}
            })

        })
        
    }

    private async FBRegister (in_email:string) {
        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {

            // let options = {method: 'POST'}
            // let resp = await fetch(`https://graph.facebook.com/v16.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${in_token}`)
            // let data = await resp.json()

            // let {error,email,name,id} = data

            // if (!!error){
            //     resolve({
            //         status:401,
            //         message:Type.StatusTypes[401],
            //         content: error["message"]
            //     })
            //     return
            // }

            // if (in_email != email){
            //     resolve({
            //         status:401,
            //         message:Type.StatusTypes[401],
            //         content: in_email
            //     })
            //     return 
            // }

            let get_response = await this.add(in_email,'facebook')
    
            if (get_response.status != 100){
                resolve({
                    status:get_response.status,
                    message:get_response.message,
                    content: get_response.content
                })
                return
            }


            resolve({
                status:100,
                message:Type.StatusTypes[100],
                content: {}
            })
            

            // Create a session using email and token 
        })
    }

    private async GRegister (in_email:string) {
        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {

            let get_response = await this.add(in_email,'google')
    
            if (get_response.status != 100){
                resolve({
                    status:get_response.status,
                    message:get_response.message,
                    content: get_response.content
                })
                return
            }


            resolve({
                status:100,
                message:Type.StatusTypes[100],
                content: {}
            })
            

            // Create a session using email and token 
        })
    }
    
    async register(in_email:string, service:Type.SServices ){

        switch (service) {
            case 'facebook':
                return this.FBRegister(in_email)

            case 'google':
                return this.GRegister(in_email)
        
            default:
                return new Promise<Type.ResponseMsg>((resolve, reject) => {
                    resolve({
                        status:100,
                        message:Type.StatusTypes[100],
                        content: {}
                    })
                })
        }

    }

    private async FBLogout (in_email:string){
        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {

            let session = new Session()
            let Sresponse = await session.getSession(in_email)
            
            let {token} = Sresponse.content

            fetch(`https://graph.facebook.com/v12.0/me/permissions?access_token=${token}`, {
                method: 'DELETE'
            })

            let response = await session.deleteSession(in_email)

            if (response.status != 100){
                resolve(
                    {
                        status:response.status,
                        message:response.message,
                        content: response.content
                    }
                )
                session.close()
                return
            }

            session.close()

            resolve({
                status:100,
                message:Type.StatusTypes[100],
                content: {}
            })

        })
    }

    private async GLogout (in_email:string){
        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {

            let session = new Session()
            let Sresponse = await session.getSession(in_email)
            
            let {token} = Sresponse.content

            fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
                method: 'POST',
                headers:{
                    'Content-type':'application/x-www-form'
                }
            })

            let response = await session.deleteSession(in_email)

            if (response.status != 100){
                resolve(
                    {
                        status:response.status,
                        message:response.message,
                        content: response.content
                    }
                )
                session.close()
                return
            }

            session.close()

            resolve({
                status:100,
                message:Type.StatusTypes[100],
                content: {}
            })

        })
    }

    //logout based on JWT
    async logout(in_email:string, service:Type.SServices){

        switch (service) {
            case 'facebook':
                return this.FBLogout(in_email)

            case 'google':
                return this.GLogout(in_email)
        
            default:
                return new Promise<Type.ResponseMsg>((resolve, reject) => {
                    resolve({
                        status:100,
                        message:Type.StatusTypes[100],
                        content: {}
                    })
                })
        }


    }

}