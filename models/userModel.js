const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    lastLogin: { 
        type: Date,
        default: null,
    },
});

userschema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10); 
            this.password = await bcrypt.hash(this.password, salt); 
        }
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userschema);
module.exports = User;
