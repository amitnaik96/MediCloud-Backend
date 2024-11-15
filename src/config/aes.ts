import crypto from 'crypto';
import 'dotenv/config'

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    throw new Error("SECRET_KEY environment variable is not defined");
}
const key = Buffer.from(secretKey, 'hex');

interface encryptedInterface{
    iv : string;
    encryptedData : string;
}

export function encrypt(data : object) : encryptedInterface {
    const jsonString = JSON.stringify(data);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(jsonString, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return ({
        iv : iv.toString('hex'),
        encryptedData : encrypted
    })
}



export function decrypt(data : encryptedInterface){
    const {iv , encryptedData} = data;
    const ivBuffer = Buffer.from(iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, ivBuffer);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return JSON.parse(decrypted);
}