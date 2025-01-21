const User = require('../models/userModel');  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function userLogin(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: "Username not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Password does not match" });
        }

     
        const token = jwt.sign(
            { id: user._id, username: user.username },
            'trupoint',  
            { expiresIn: '2h' }
        );

        return res.status(201).json({ msg: "Token generated successfully",user , token });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
}

module.exports = { userLogin };
