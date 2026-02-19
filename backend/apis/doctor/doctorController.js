const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Doctor = require('../doctor/doctorModel');

// SIGNUP LOGIC
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await Doctor.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User Already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Doctor.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            status: "Completed",
            id: user._id,
            name: user.name
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error during signup" });
    }
};

// LOGIN LOGIC
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await Doctor.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ 
                error: `The user with ${email} Does not Exist` 
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Wrong password" });
        }

        const payload = {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
        };

        const token = jwt.sign(payload, process.env.JWT_CODE);

        return res.status(200).json({
            msg: "The user is logged in",
            token: token
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error during login" });
    }
};

module.exports = { signup, login };