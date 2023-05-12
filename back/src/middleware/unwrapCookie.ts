import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as Type from "../utils/types";
import { verifyJWT } from "../utils/token";
import { Session } from "../models/sessions";

const unwrapCookies =async (req: Request, res: Response, next: NextFunction) => {
  const {ASP_AT} = req.cookies;

  
  if (!ASP_AT) {
    console.log("no token");
    res.status(400).json(
        {
            status:203,
            message:Type.StatusTypes[203],
            content: {}
        }
    )
    return;
  }
  

//   const token = authHeader.split(" ")[1];

  let verif_out = verifyJWT(ASP_AT)
  if (verif_out.payload == null){
    
    res.status(403).json(
      {
        status:203,
        message:Type.StatusTypes[203],
        content: {}
      }
    );
    return 
  } 

  
  let payload = verif_out.payload as {
    email: string,
    session_id : number
  }
  
  req.params.session_id = `${payload.session_id}`
  req.params.email = `${payload.email}`

//   console.log(payload);
  next();

};

export default unwrapCookies;




