import { Router } from 'express';
import { PrismaClient } from "@prisma/client";
import {encrypt, decrypt} from "../config/aes";
import { authMiddleware } from "../middleware/authMiddleware";
import {patientSchema, updateSchema} from "../types/patient";

const router = Router();
const prisma = new PrismaClient();

router.get('/patients', authMiddleware, async (req, res) => {
    try {
        const response = await prisma.patient.findMany({
            take : 3,
            select : {
                id : true,
                name : true,
                phone_no : true
            }
        })
        res.json({
            response
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
        const decryptedResponse = decrypt({iv : response.iv, encryptedData : response.encrypted_data});

        res.json({
            response : {
                id : response.id,
                name : response.name,
                phoneNo : response.phone_no,
                age : decryptedResponse.age,
                bloodGroup : decryptedResponse.bloodGroup,
                weight : decryptedResponse.weight,
                married : decryptedResponse.married,
                insurance : decryptedResponse.insurance,
                note : decryptedResponse.note
            }
        })
    } catch(err){
        res.status(503).json({
            message : 'server error'
        });
    }
})


router.post('/patient', authMiddleware,  async (req, res) => {
    try {
        const success = patientSchema.safeParse(req.body);
        if(!success){
            //console.log(result.error.errors);
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
            },
            select : {
                id : true
            }
        });
        res.json({
            id : response.id,
            message : 'Patient added successfully!'
        })
    } catch (err) {
        res.status(411).json({
            message : 'some server error'
        });
    }
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
            name,
            phoneNo,
            age,
            weight,
            bloodGroup,
            married,
            insurance,
            note
        } = req.body;

        const patient = await prisma.patient.findFirst({
            where : {id : Number(id)}
        });

        if(!patient){
            res.status(411).json({
                message : 'patient doesnt exist!'
            });
            return;
        }

        const dataBody:any = {};
        if(name) dataBody.name = name;
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

router.get('/filterpatient', authMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter as string;
        if(!filter){
            res.status(411).json({
                message : 'invalid params'
            })
        }

        const response = await prisma.patient.findMany({
            where : {
                phone_no : {startsWith : filter}
            },
            take : 5,
            select : {
                id : true,
                name : true,
                phone_no : true
            }
        })

        res.json({
            response
        })
    } catch (err) {
        res.status(403).json({
            message : 'server error'
        });
    }
})

export default router;