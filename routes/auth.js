const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');


// User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});


// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, 'saksham', {
            expiresIn: '1h',
        });
        res.status(200).json({ token ,userId:user._id});
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});


router.post("/checkauth",verifyToken)

module.exports = router;
