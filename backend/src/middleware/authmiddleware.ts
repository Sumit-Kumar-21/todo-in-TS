import jwt, {JwtPayload} from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// import dotenv from 'dotenv';

// dotenv.config();

// const JWT_SECRET:string = process.env.JWT_SECRET!;
const JWT_SECRET: string = process.env.JWT_SECRET!;

console.log("hi "+JWT_SECRET);


interface RequestWithUserId extends Request{
    userId?: number
}

enum statusCode {
    FORBIDDEN= 403,
    UNAUTHORIZED= 401
}

const authMiddleware = (req: RequestWithUserId, res: Response, next: NextFunction)=>{

    const authHeader:string = req.headers.authorization!;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(statusCode.UNAUTHORIZED).json({
            message:'Invalid Token'
        })
    }
    const token:string = authHeader.split(" ")[1];
    try {
        const decode: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;

        if(decode.userId){

            req.userId = decode.userId;
            next();
        }else{
            return res.status(statusCode.FORBIDDEN).json({message: "invalid token"});
        }
        
    } catch (error) {
        return res.status(statusCode.FORBIDDEN).json({message: error});
    }
}

export default authMiddleware;