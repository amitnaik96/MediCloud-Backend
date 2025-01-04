import { Router } from 'express';
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "../config/hash";
import jwt from "jsonwebtoken"; 
import 'dotenv/config'

const router = Router();
const prisma = new PrismaClient();

const signinSchema = z.object({
    username : z.string().email(),
    password : z.string()
});

router.post('/signin', async (req, res) => {
    try {
        const { success } = signinSchema.safeParse(req.body);
        if(!success){
            res.status(411).json({
                message : "invalid inputs"
            });
        }
        
        const { username, password} = req.body;
        const checkUser = await prisma.doctor.findFirst({
            where : {username},
            select : {
                id : true,
                admin : true,
                password : true
            }
        });

        if(checkUser == null){
            res.status(403).json({
                message : 'user does not exist / invalid credentials'
            });
            return;
        }

        const isMatch = await verifyPassword(password, checkUser.password);
        if(!isMatch){
            res.status(403).json({
                message : 'user does not exist / invalid credentials'
            });
            return; 
        }

        const JWT_SECRETKEY = process.env.JWT_SECRETKEY;
        if(!JWT_SECRETKEY){
            throw new Error("JWT_SECRETKEY environment variable is not defined");
        }
        const token = jwt.sign({id : checkUser.id, username, admin : checkUser.admin}, JWT_SECRETKEY);
        res.cookie("token", token, {
            httpOnly : true, 
            path : '/',
            maxAge: 3600000,
        });
        res.json({
            message : "user loggedin!!" 
        })
    } catch (err) {
        res.status(411).json({
            message : 'server error'
        });
    }
});

export default router;