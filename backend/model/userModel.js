const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: '' },
    addresses: [{ type: String }],
    role: {
        type: String,
        enum: ['admin', 'seller', 'buyer'],
        default: 'buyer'
    },
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);