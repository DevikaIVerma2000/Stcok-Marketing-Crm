const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAuth = require('../models/userAuthModel');

async function userLogin(req, res) {
    const { username, password } = req.body;

    try {
        const user = await UserAuth.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: "Username not found" });
        }

        if (user.emp_access_status !== 'active') {
            return res.status(403).json({msg: `Account is ${user.emp_access_status}. Please contact support.`});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            user.wrong_attempts += 1;
            await user.save();
            return res.status(401).json({ msg: "Password does not match" });
        }

        user.wrong_attempts = 0;
        user.login_status = true;
        user.updated_at = new Date();
        await user.save();

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET || 'trupoint',
            { expiresIn: '2h' }
        );

        return res.status(201).json({ msg: "Token generated successfully", user, token });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
}


async function resetPassword(req, res) {
    const { newPassword, confirmPassword } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: "Authorization token is required" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'trupoint');
        const userId = decoded.id;

        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ msg: "Both new password and confirm password are required." });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match." });
        }

        const user = await UserAuth.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Check if the employee is inactive or suspended
        if (user.emp_access_status !== 'active') {
            return res.status(403).json({ msg: `Cannot reset password for ${user.emp_access_status} account.` });
        }

        // Hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.updated_at = new Date();

        await user.save();

        return res.status(200).json({ msg: "Password reset successful." });
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: "Invalid or expired token." });
        }
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
}

module.exports = { userLogin, resetPassword };
