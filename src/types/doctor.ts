import { z } from 'zod';

export const doctorSchema = z.object({
    name : z.string(),
    username : z.string().email(),
    password : z.string(),
    admin : z.boolean(),
    degree : z.string(),
    specialist : z.string(),
    yoe : z.number()
});