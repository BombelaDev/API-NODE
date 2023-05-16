import {Request, Response,} from 'express';

class Responses {
    static send(res:Response, req:Request, codeStatus:number,error:boolean, message:string){
        return res.status(codeStatus).json({
            error,
            message
        })
    }
}

export default Responses;