
/* Messages types  */
export const StatusTypes = {
    100: 'Success',
    200: 'Already exist',
    201: 'Input does not exist',
    202: 'Request fail',
    203: 'Unauthorized',
    400: 'Input missing',
    401: 'Incorrect input',
    402: 'Incorrect input type',
    403: 'Not authorized',
    404: 'System error',
    405: 'Already connected',
    406: 'Missing Token',
    407: 'Token does not correspond to any session'
};

/* Connection  */

export const ConnectType ={}

/* Routes response structure */

export type ResponseMsg = {
    status: number,
    message: string,
    content: any
}

/* FBLogin */

export interface FBLoginInfo  {
    id:string,
    name:string,
    email:string,
    picture:{
        data:{
            url: string,
        }
    }
}

export interface FBError {
    error:{
        message: string,
        type: string,
        code: number,
        fbtrace_id : string
    }
}