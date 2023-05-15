import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as Type from "../utils/types";
import { verifyJWT } from "../utils/token";
import { Session } from "../models/sessions";

const checkAuth =async (req: Request, res: Response, next: NextFunction) => {
  // const {ASP_AT} = req.cookies;

  const authorizationHeader = req.headers.authorization;
  
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    res.status(400).json(
        {
            status:203,
            message:Type.StatusTypes[203],
            content: {}
        }
    )
    return;
  }

  const ASP_AT = authorizationHeader.split(' ')[1];

  // if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
  //   const token = authorizationHeader.split(' ')[1];

  //   try {
  //     const decoded = jwt.verify(token, 'your_secret_key');
  //     // Access the decoded token and perform necessary operations
  //     req.user = decoded;
  //   } catch (err) {
  //     // Handle JWT verification error
  //     return res.status(401).json({ error: 'Invalid token' });
  //   }
  // }
  

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

  next();

};

export default checkAuth;




