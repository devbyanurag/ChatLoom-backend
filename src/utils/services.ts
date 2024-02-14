import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export function generateJWTToken(userId: string, expiresIn: string): string | null {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        const token = jwt.sign({ userId }, jwtSecret, { expiresIn });
        return token;
    } catch (error) {
        return null
    }
}

export function verifyJWTToken(token: string): Object | boolean {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        const tokenVal=jwt.verify(token, jwtSecret)
        return tokenVal;
    } catch (error) {
        return false;
    }
}
export async function hashPassword(plainPassword: string) {
    const saltRounds = 10; // Number of salt rounds (cost factor)
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;

}

export async function checkPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match; 
    } catch (error) {
        return false;
    }
}