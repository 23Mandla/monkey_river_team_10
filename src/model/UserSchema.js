const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    result: { type: Number, required: true },
    date: { type: Date, required: true },
    password: { type: String, required: true }
}, { timestamps: true });


// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // only hash if modified
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', userSchema);
