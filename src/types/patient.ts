import { z } from "zod"; 

export const patientSchema = z.object({
    name : z.string(),
    phoneNo : z.string(),
    age : z.number(),
    weight : z.string(),
    bloodGroup : z.string(),
    married : z.boolean(),
    insurance : z.boolean(),
    note : z.string()
});

export const updateSchema = z.object({
    name : z.string().optional(),
    phoneNo : z.string().optional(),
    age : z.number().optional(),
    weight : z.string().optional(),
    bloodGroup : z.string().optional(),
    married : z.boolean().optional(),
    insurance : z.boolean().optional(),
    note : z.string().optional()
})