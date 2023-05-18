import { Request, Response } from "express";
import { User } from "../models/users";
import * as Type from "../utils/types";
import { signJWT } from "../utils/token";
import fetch from "node-fetch";
// import { Tags } from "../models/tags";

const attachToken = (payload:object,res: Response)=>{
    console.log("setting cookie");
    
    const accessToken = signJWT(payload, process.env.ACCESS_TOKEN_TTL as string ||'1d');
    // res.cookie("ASP_AT",accessToken,{maxAge:24*60*60*1000 ,sameSite:"none",secure:true})
    res.cookie("ASP_AT",accessToken,{maxAge:24*60*60*1000 ,sameSite:"none",secure:true})
}

export const login = async (req: Request, res: Response)=>{
    console.log('login in ');
    

    let {email,service,token} = req.params

    if (!email || !service){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {}
            }
        )
    }

    
    let user = new User()
    //@ts-ignore
    let response = await user.login(email,{
        token:token,
        service:service == 'google'? 'google' : service == 'facebook' ? 'facebook' : 'google'
    })


    
    if (response.status != 100 && response.status != 201){
        user.close()
        res.status(400).json(
            {
                status:response.status,
                message:response.message,
                content: response.content
            }
        )
        return
    }

    if (response.status == 201){
        console.log(201);
        
        if (service == "facebook"){
            let reg_response = await user.register(email,'facebook')

            if (reg_response.status != 100 ){
                user.close()
                res.status(400).json(
                    {
                        status:reg_response.status,
                        message:reg_response.message,
                        content: reg_response.content
                    }
                )
                return
            }
        }
        else if (service == "google"){
            let reg_response = await user.register(email,'google')

            if (reg_response.status != 100 ){
                user.close()
                res.status(400).json(
                    {
                        status:reg_response.status,
                        message:reg_response.message,
                        content: reg_response.content
                    }
                )
                return
            }
        }
        

    }
    user.close()
    
    
        
    attachToken({
        email: email,
        session_id :response.content.session_id
    },res)

    const accessToken = signJWT({
        email: email,
        session_id :response.content.session_id,
        service: service
    }, process.env.ACCESS_TOKEN_TTL as string ||'1d');
    res.cookie("ASP_AT",accessToken,{maxAge:24*60*60*1000 ,sameSite:"none"})
    
    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: accessToken
        }
    )
}

export const register = async (req: Request, res: Response)=>{
    let {u_tag} = req.params

    let {token,email} = req.body

    if (!email){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {}
            }
        )
    }

    let user = new User()

    let response = await user.register(email,token)

    user.close()

    if (response.status != 100){
        res.status(400).json(
            {
                status:response.status,
                message:response.message,
                content: response.content
            }
        )
        return
    }
    
    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: response
        }
    )
}

export const logout = async (req: Request, res: Response)=>{

    // erase cookie 
    let user = new User()
    let resp = await user.logout(req.params.email,'google' )
    if (req.params.service == "facebook")resp = await user.logout(req.params.email,'facebook')
        
    user.close()
    if (resp.status != 100){
        res.status(400).json({
            status:resp.status,
            message:resp.message,
            content: resp.content
        })
        return
    }

    // res.clearCookie("ASP_AT")

    

    res.status(200).json({
        status:100,
        message:Type.StatusTypes[100],
        content: {}
    })
    
}

export const ping = async (req: Request, res: Response)=>{

    res.status(200).json({
        status:100,
        message:Type.StatusTypes[100],
        content: {}
    })
    
}


