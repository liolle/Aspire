import DbConnect from "../utils/dbConnect";
// import bcrypt from "bcrypt";
// import { getTimeStamp } from "../utils/time";
// import { randomTag } from "../utils/random";

// import * as Type from "./types";
// import {Session} from "./sessions"
// import { Tags } from "./tags";

import * as Type from "../utils/types";

export class User extends DbConnect {


    constructor(){
        super();
        
    }

    async login(email:string, ){

        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {

            // let session = new Session()
            // let dbUser = await this.getUser(email)

            // if (dbUser.status != 100){
            //     resolve({
            //         status:dbUser.status,
            //         message:dbUser.message,
            //         content: dbUser.content
            //     })
            //     return
            // }

            // let {id,pwd} = dbUser.content as {
            //     id:number,
            //     pwd:string
            // }

            // if (!bcrypt.compareSync(in_pwd,pwd)){
            //     resolve({
            //         status:401,
            //         message:Type.StatusTypes[401],
            //         content: {}
            //     })
            //     return
            // }

            // let resSession = await session.getSession(id) 

            // let delSession = await session.deleteSession(id)
           

            // resSession = await session.addSession(id)
            // session.close()
            // if ( resSession.status != 100){
            //     resolve({
            //         status:202,
            //         message:Type.StatusTypes[202],
            //         content: resSession.content
            //     })
            //     return
            // }
            // console.log(resSession);
            
            // resSession = await session.getUId(id) 
            
            // let content = resSession.content as [{
            //     id:number,
            //     user_id:number,
            //     tag:string
            // }]

            // console.log(resSession);
            
            
            // resolve({
            //     status:100,
            //     message:Type.StatusTypes[100],
            //     content: {
            //         hashedPWD:pwd,
            //         user_id:id,
            //         user_tag:content[0]['tag'],
            //         session_id: content[0]['id']
            //     }
            // })
        })
        
    }

    //logout based on JWT
    async logout(email:string){

        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {
            // let session = new Session()

            // let resSession = await session.deleteSession(user_id)
            // session.close()
            // if ( resSession.status != 100){
            //     resolve({
            //         status:202,
            //         message:Type.StatusTypes[202],
            //         content: resSession.content
            //     })
            //     return
            // }
            
            // resolve({
            //     status:100,
            //     message:Type.StatusTypes[100],
            //     content: {}
            // })
        })

    }


}