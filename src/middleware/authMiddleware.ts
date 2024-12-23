import {Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken";
import 'dotenv/config'

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.cookies.token;
        const JWT_SECRETKEY = process.env.JWT_SECRETKEY;
        if(!JWT_SECRETKEY){
            res.status(411).json({
                message : 'server error / missing JWT_SECRETKEY'
            });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRETKEY) as jwt.JwtPayload;
        (req as any).id = decoded.id;
        next();
    } catch (err) {
        // console.log(err);
        res.status(403).json({
            message : 'invalid token, user/doctor not authenticated'
        })
    }
}
