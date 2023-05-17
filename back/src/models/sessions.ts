import DbConnect from "../utils/dbConnect";
import * as Type from "../utils/types";


export class Session extends DbConnect{



    constructor(){
        super();
    }

    // getSession(session_id:number){
    //     //
    //     let sql_add_session = `
    //     SELECT S.id, S.user_id, T.tag FROM bf_sessions S
    //     left join bf_tags T on T.context_id = S.user_id 
    //     WHERE S.id = ${session_id}
    //     `

    //     return new Promise<Type.ResponseMsg>((resolve, reject) => {
    //         this.connection.query(sql_add_session, async (err:any, rows:any, fields:any)=>{
    //             if (err){
                    
    //                 resolve({
    //                     status:202,
    //                     message:Type.StatusTypes[202],
    //                     content: {error: err}
    //                 })
    //                 return 
    //             }

                
    //             if (rows.length == 0){
    //                 resolve({
    //                     status:201,
    //                     message: Type.StatusTypes[201],
    //                     content: {}
    //                 })
    //                 return
    //             }
                        
    //             resolve({
    //                 status:100,
    //                 message:Type.StatusTypes[100],
    //                 content: rows
    //             })
    //         })
    //     })

    // } 

    getSession(email:string){
        //
        let sql_add_session = `
        SELECT * FROM ma_sessions
        WHERE email = '${email}'
        
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(sql_add_session, async (err:any, rows:any, fields:any)=>{
                if (err){
                    
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: {error: err}
                    })
                    return 
                }

                
                if (rows.length == 0){
                    resolve({
                        status:201,
                        message: Type.StatusTypes[201],
                        content: {}
                    })
                    return
                }
                        
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {
                        email:rows[0]['email'],
                        session_id :rows[0]['id'],
                        token : rows[0]['Token']
                    }
                })
            })
        })

    } 

    

    addSession(email:string,token:string){
        let sql_add_session = `
        INSERT INTO ma_sessions (email, Token)
        VALUES('${email}','${token}')
        ON DUPLICATE KEY UPDATE Token='${token}'
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(sql_add_session, async (err:any, rows:any, fields:any)=>{
                if (err){
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: {error: err}
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

    deleteSession(email:string){
        let sql_del_session = `
        DELETE FROM ma_sessions 
        WHERE email = '${email}'
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(sql_del_session, async (err:any, rows:any, fields:any)=>{
                if (err){
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: {error: err}
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