import { Request, Response } from "express";
import { User } from "../models/users";
import * as Type from "../utils/types";
import { signJWT } from "../utils/token";
import fetch from "node-fetch";
// import { Tags } from "../models/tags";

const attachToken = (payload:object,res: Response)=>{
    const accessToken = signJWT(payload, process.env.ACCESS_TOKEN_TTL as string ||'1d');
    // res.cookie("ASP_AT",accessToken,{maxAge:24*60*60*1000 ,sameSite:"none",secure:true})
    res.cookie("ASP_AT",accessToken,{maxAge:24*60*60*1000 ,sameSite:"none",secure:true})
}

export const login = async (req: Request, res: Response)=>{
    let {u_tag} = req.params

    let {token} = req.body

    if (!token){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {}
            }
        )
    }
    
    let FBresponse = await fetch(`https://graph.facebook.com/v16.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${token}`)
    let data = await FBresponse.json() as Type.FBLoginInfo | Type.FBError
    console.log(`https://graph.facebook.com/v16.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${token}`);
    
    if ("error" in data){
        res.status(400).json(
            {
                status:100,
                message:Type.StatusTypes[100],
                content: data.error.message
            }
        )

        return
    }

    console.log(data);
    

    let user = new User()

    let response = await user.login(data.email,token)

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

    attachToken({
        email: data.email,
        session_id :response.content.session_id
    },res)

    const accessToken = signJWT({
        email: data.email,
        session_id :response.content.session_id
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
    let resp = await user.logout(req.params.email)
        
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


