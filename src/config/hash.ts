import bcrypt from 'bcrypt';

export async function hashPassword(password : string){
    const rounds = 10;
    const hashPassword = await bcrypt.hash(password, rounds);
    return hashPassword;
}

export async function verifyPassword(plain: string, hashed : string) {
    const isMatch = await bcrypt.compare(plain, hashed);
    return isMatch;
}