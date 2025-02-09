import { Router } from 'express';
import { PrismaClient } from "@prisma/client";
import {encrypt, decrypt } from "../config/aes";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { hashPassword } from "../config/hash"; 
import { doctorSchema } from "../types/doctor";

const router = Router();
const prisma = new PrismaClient();

router.get('/doctors', adminMiddleware, async (req, res) => {
    try {
        const response = await prisma.doctor.findMany({
            take : 3,
            select : {
                id : true,
                name : true,
                username : true
            }
        });

        res.json({
            response
        })
    } catch(err) {
        res.status(503).json({
            message : "server error"
        })
    }
});

router.get('/doctor', adminMiddleware, async (req, res) => {
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
                message : `No doctor with id ${id}`
            })
            return;
        }
        const decryptedResponse = decrypt({ iv : response.iv, encryptedData : response.encrypted_data});

        res.json({
            response : {
                id : response.id,
                name : response.name,
                username : response.username,
                degree : decryptedResponse.degree,
                specialist : decryptedResponse.specialist,
                yoe : decryptedResponse.yoe 
            }
        })
    } catch(err) {
        res.status(411).json({
            message : 'server error'
        });
    }
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
            },
            select : {
                id : true
            }
        });
        res.json({
            id : response.id,
            message : 'Doctor added successfully!'
        });
    } catch (err) {
        res.status(411).json({
            message : 'server error'
        })
    } 
});

router.get('/filterdoctor', adminMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter as string;
        if(!filter){
            res.status(411).json({
                message : 'invalid params'
            });
            return;
        }

        const response = await prisma.doctor.findMany({
            where : {
                username : { startsWith : filter}
            },
            take : 10,
            select : {
                id : true,
                name : true,
                username : true
            }
        });
        res.json({
            response
        });
    } catch (err) {
        res.status(403).json({
            message : 'server error'
        });
    }
})

export default router;


