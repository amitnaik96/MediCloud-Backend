import { Router } from 'express';
import { z } from "zod"
import { PrismaClient } from "@prisma/client";
import {encrypt, decrypt} from "../config/aes";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

router.get('/patients', authMiddleware, async (req, res) => {
    try {
        const response = await prisma.patient.findMany({
            take : 10
        })
        const decrytedResponse = response.map(obj => {
            return {
                id : obj.id, 
                name : obj.name, 
                phoneNo : obj.phone_no, 
                details : decrypt({iv : obj.iv, encryptedData : obj.encrypted_data})};
        })
        res.json({
            response : decrytedResponse
        });
    } catch(err) {
        res.status(503).json({
            message : 'server error'
        })
    }
})


router.get('/patient', authMiddleware, async (req, res) => {
    try {
        const id = req.query.id as string;
        if(!id){
            res.status(403).json({
                message : 'invalid params'
            })
            return;
        }
        const response = await prisma.patient.findFirst({
            where : {id : parseInt(id)}
        })
        if(response == null){
            res.status(411).json({
                message : `No patient with id ${id}`
            })
            return;
        }
        const decryptedResponse = {
            id : response.id,
            name : response.name,
            phoneNo : response.phone_no,
            details : decrypt({iv : response.iv, encryptedData : response.encrypted_data})
        }
        res.json({
            response : decryptedResponse
        })
    } catch(err){
        res.status(503).json({
            message : 'server error'
        });
    }
})

const patientSchema = z.object({
    name : z.string(),
    phoneNo : z.string(),
    age : z.number(),
    weight : z.string(),
    bloodGroup : z.string(),
    married : z.boolean(),
    insurance : z.boolean(),
    note : z.string()
});

router.post('/patient', authMiddleware,  async (req, res) => {
    try {
        const { success } = patientSchema.safeParse(req.body);
        if(!success){
            res.status(411).json({
                message : 'invalid inputs'
            });
            return;
        }

        const {name, phoneNo, age, weight, bloodGroup, married, insurance, note} = req.body;
        const patientExists = await prisma.patient.findFirst({
            where : {phone_no : phoneNo}
        });
        // console.log(patientExists);
        if(patientExists != null){
            res.status(411).json({
                message : 'patient already exists'
            })
            return;
        }


        const {iv, encryptedData} = encrypt({ age, bloodGroup, weight, married, insurance, note});
        const response = await prisma.patient.create({
            data : {
                name,
                phone_no : phoneNo,
                iv,
                encrypted_data : encryptedData
            }
        });
        res.json({
            message : 'Patient added successfully!'
        })
    } catch (err) {
        res.status(411).json({
            message : 'some server error'
        });
    }
})

const updateSchema = z.object({
    phoneNo : z.string().optional(),
    age : z.number().optional(),
    weight : z.string().optional(),
    bloodGroup : z.string().optional(),
    married : z.boolean().optional(),
    insurance : z.boolean().optional(),
    note : z.string().optional()
})

router.put('/patient', async (req, res) => {
    try {
        const id = req.query.id as string;
        if(!id){
            res.status(411).json({
                message : "invalid params"
            });
            return;
        }
        const success = updateSchema.safeParse(req.body);
        if(!success){
            res.status(411).json({
                message : 'invalid inputs'
            });
            return;
        }
        const {
            phoneNo,
            age,
            weight,
            bloodGroup,
            married,
            insurance,
            note
        } = req.body;

        const patient = await prisma.patient.findFirst({
            where : {id : parseInt(id)}
        });

        if(!patient){
            res.status(411).json({
                message : 'patient doesnt exist!'
            });
            return;
        }

        const dataBody: any = {};
        if(phoneNo) dataBody.phone_no = phoneNo;
        if(age || weight || bloodGroup || married || insurance || note){
            const obj = decrypt({iv : patient.iv, encryptedData : patient.encrypted_data});
            if(age) obj.age = age;
            if(weight) obj.weight = weight;
            if(bloodGroup) obj.bloodGroup = bloodGroup;
            if(married) obj.married = married;
            if(insurance) obj.insurance = insurance;
            if(note) obj.note = note;
            const {iv, encryptedData} = encrypt(obj);
            dataBody.iv = iv;
            dataBody.encrypted_data = encryptedData;
        }


        const response = await prisma.patient.update({
            where : {id : parseInt(id)},
            data : dataBody
        });
        res.json({
            message : 'patient data updated successfully'
        })
    } catch (err) {
        res.status(411).json({
            message : 'server error'
        });
    }

})

export default router;