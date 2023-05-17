import jwt from "jsonwebtoken";
import crypto from "crypto";


// sign jwt
export function signJWT(payload: object, expiresIn: string | number) {
    return jwt.sign(payload, process.env.PRIVATE_KEY as string, { algorithm: "RS256", expiresIn: expiresIn });
  }
  
// verify jwt
export function verifyJWT(token: string) {
    
    try {
        const decoded = jwt.verify(token, process.env.PUBLIC_KEY as string);
        return { payload: decoded, expired: false };
    } catch (error) {
        //@ts-ignore
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}




