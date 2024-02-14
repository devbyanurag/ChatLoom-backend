import { Request, Response, Router } from "express";
import User, { IUser } from "../models/User";
const router_user = Router();
import { checkPassword, generateJWTToken, hashPassword, verifyJWTToken } from "../utils/services";



router_user.post('/signup', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Check if user with email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.verified) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }
            await User.deleteOne({ _id: existingUser._id })
        }
        const hashedPassword = await hashPassword(password);
        const newUser: IUser = new User({
            name,
            email,
            password: hashedPassword,
            verified: true,
            createdAt: new Date()  // Add the createdAt field here
        });
        const createdUser = await newUser.save();
        const token = generateJWTToken(email, "2m")
        if (token === null) {
            res.status(400).json({ message: 'User created Failed' });
        }
        else {
            res.status(201).json({ message: 'User created successfully', token: token, name: createdUser.name, id: createdUser._id, email: createdUser.email });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router_user.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User with this email not exists' });
        }
        const passwordMatched = await checkPassword(password, existingUser.password)
        if (!passwordMatched) {
            return res.status(400).json({ message: 'password does not match' });
        }
        const token = generateJWTToken(email, "2m")
        res.status(201).json({ message: 'User created successfully', token: token, name: existingUser.name, id: existingUser._id, email: existingUser.email });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router_user.post('/verify-login', async (req: Request, res: Response) => {
    try {
        const { token } = req.body;

        const isTokenValid = verifyJWTToken(token); // Assuming verifyJWTToken returns a boolean
        if (!isTokenValid) {
            return res.status(401).json({ message: 'token expired login again' });
        }
        if (typeof isTokenValid === 'object' && 'userId' in isTokenValid) {
            const existingUser = await User.findOne({ email: isTokenValid.userId });
            if (!existingUser) {
                return res.status(400).json({ message: 'User with this email not exists' });
            }
            res.status(201).json({ message: 'User created successfully', token: token, name: existingUser.name, id: existingUser._id, email: existingUser.email });

        }
        else {
            return res.status(400).json({ message: 'Verify Failed' });

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});





export { router_user }
