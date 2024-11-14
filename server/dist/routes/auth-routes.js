import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: { username },
        });
        if (!user) {
            res.status(401).json({ message: 'Email/password not found' });
            return;
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            res.status(401).json({ message: 'Email/password not found' });
            return;
        }
        const secretKey = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json(error);
        return;
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
