const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.loginUser = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({message: 'Invalid password' });

    
    const token = jwt.sign({id: user._id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '1h',});
   
    res.json({ token }); 
};

module.exports = authMiddleware;