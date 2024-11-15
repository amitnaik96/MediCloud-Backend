import { Router } from 'express';
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import {encrypt, decrypt } from "../config/aes";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { hashPassword } from "../config/hash"; 

const router = Router();
const prisma = new PrismaClient();

router.get('/doctors', authMiddleware, async (req, res) => {
    try {
        const response = await prisma.doctor.findMany({
            take : 10
        });

        const decryptedResponse = response.map(obj => {
            return {
                id : obj.id,
                name : obj.name,
                username: obj.username,
                details : decrypt({iv : obj.iv, encryptedData : obj.encrypted_data}) 
            }
        });

        res.json({
            response : decryptedResponse
        })
    } catch(err) {
        res.status(503).json({
            message : "server error"
        })
    }
});

router.get('/doctor', authMiddleware, async (req, res) => {
    try {
        const id = req.query.id as string;
        if(!id){
            res.status(411).json({
                message : 'invalid params'
            });
            return;
        }

        const response = await prisma.doctor.findFirst({
            where : {id : parseInt(id)}
        });
        if(response == null){
            res.status(411).json({
                message : `No patient with id ${id}`
            })
            return;
        }
        const decryptedResponse = {
            id : response.id,
            name : response.name,
            username : response.username,
            details : decrypt({ iv : response.iv, encryptedData : response.encrypted_data})
        }
        res.json({
            response : decryptedResponse
        })
    } catch(err) {
        res.status(411).json({
            message : 'server error'
        });
    }
});

const doctorSchema = z.object({
    name : z.string(),
    username : z.string().email(),
    password : z.string(),
    admin : z.boolean(),
    degree : z.string(),
    specialist : z.string(),
    yoe : z.number()
});

router.post('/doctor', adminMiddleware, async (req, res) => {
    try{
        const { success } = doctorSchema.safeParse(req.body);
        if(!success){
            res.status(411).json({
                message : 'invalid inputs'
            })
            return;
        }

        const {name, username, admin, password, degree, specialist, yoe} = req.body;
        const doctorExists = await prisma.doctor.findFirst({
            where : {username}
        });
        if(doctorExists != null){
            res.status(403).json({
                message : 'doctor already exists!'
            });
            return;
        }
        
        const hashedPassword = await hashPassword(password);  
        const {iv, encryptedData} = encrypt({degree, specialist, yoe});
        const response = await prisma.doctor.create({
            data : {
                name,
                username,
                password : hashedPassword,
                admin,
                iv,
                encrypted_data : encryptedData
            }
        });
        res.json({
            message : 'Doctor added successfully!'
        });
    } catch (err) {
        res.status(411).json({
            message : 'server error'
        })
    } 
});

export default router;


