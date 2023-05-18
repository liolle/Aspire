import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as Type from "../utils/types";
import jwtDecode from "jwt-decode";
import { verifyJWT } from "../utils/token";
import { Session } from "../models/sessions";



const consumeToken =async (req: Request, res: Response, next: NextFunction) => {
  console.log('consuming token');
  
  const {token,service} = req.body

  if (!token|| !service){
    res.status(400).json(
        {
            status:400,
            message:Type.StatusTypes[400],
            content: {}
        }
    )
    return
  }

  // needs to verify token for security reason
  
  
  
  
  // abstract this ??

  let lower_service = (service as string).toLowerCase()
  
  let message = "Unsupported service "+lower_service

  if (lower_service ==  "google"){
    try {
        req.params.token = token
        let decode = jwtDecode(token)  
        const {email,name,picture} = decode as {email:string,name:string,picture:string}

        
        req.params.email = email
        req.params.name = name
        req.params.picture = picture
        req.params.service = lower_service
          
    } catch (error) {
        res.status(400).json(
            {
                status:401,
                message:Type.StatusTypes[401],
                content: "Invalid service token: "+lower_service
            }
        )
        return
    }
    
  }else if (lower_service ==  "facebook"){
    res.status(400).json(
        {
            status:401,
            message:Type.StatusTypes[401],
            content: "Unavailable service come back later"
        }
    )
    return
  }

    // let FBresponse = await fetch(`https://graph.facebook.com/v16.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${token}`)
    // let data = await FBresponse.json() as Type.FBLoginInfo | Type.FBError
    // console.log(`https://graph.facebook.com/v16.0/me?fields=id%2Cname%2Cemail%2Cpicture&access_token=${token}`);
    
    // if ("error" in data){
    //     res.status(400).json(
    //         {
    //             status:100,
    //             message:Type.StatusTypes[100],
    //             content: data.error.message
    //         }
    //     )

    //     return
    // }

    /*
    
    { clientId: "413897785903-583eg046i9tmj5u1ombhac4grbpuf4fq.apps.googleusercontent.com", 
    client_id: "413897785903-583eg046i9tmj5u1ombhac4grbpuf4fq.apps.googleusercontent.com", 
    credential: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyMjgzOGMxYzhiZjllZGNmMWY1MDUwNjYyZTU0YmNiMWFkYjViNWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODQ0MjcxNDYsImF1ZCI6IjQxMzg5Nzc4NTkwMy01ODNlZzA0Nmk5dG1qNXUxb21iaGFjNGdyYnB1ZjRmcS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNzA0ODIxNDgyNjg2OTMxNTA1MSIsImVtYWlsIjoiZXRpZW5uZXRlc3RkZXZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjQxMzg5Nzc4NTkwMy01ODNlZzA0Nmk5dG1qNXUxb21iaGFjNGdyYnB1ZjRmcS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJFdGllbm5lIGxhdXJlbnQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4WXpSckZsYzFsMi1VRjlYeXhidk54X3FGVkQ4UmlEU1Z5SkZkbFo9czk2LWMiLCJnaXZlbl9uYW1lIjoiRXRpZW5uZSIsImZhbWlseV9uYW1lIjoibGF1cmVudCIsImlhdCI6MTY4NDQyNzQ0NiwiZXhwIjoxNjg0NDMxMDQ2LCJqdGkiOiI5OGVjNGQxNDliMGIwNmM1ODE5YzBlMDRiYjA4NjhhZDUyYWZhYjc1In0.rQqwBTH25ti5HNEsbu7MzWHNeV0mDvV5W9D1u6KOVO1mpkLGNIH0fssQi3AcO_BFfVFOWYsd7U_q7qtNjxh6N_Y7E14dIw6pk5COwBp0ekVpKbUxPaf42yzNCbFAQaWE9f1UX9bs2zJtkn85nFsJypU7sZBE6Sgbf5OgeEhFuUyEd9dxnMuso6WpE1nGKxwbQ44ltruemd2mqSqwCIxplPvL-C-AaZWovGsj5s1x0zGANMC7IIDNyPgDDsHDzl2NSxX3i6hcdvQHFr92SE1XMQ8zByqX29aWcK0PkSYB9bOMgVqtMQ--034MgQbDhYcTFT_aNr_E20Wdo3KiNCyRpA", select_by: "user" }
    
    */

  next();

};

export default consumeToken;




