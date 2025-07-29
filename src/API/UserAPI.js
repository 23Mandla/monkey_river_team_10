const express = require('express');
const User = require('./models/User');

const app = express();
app.use(express.json());


// Routes
app.get('/api/users', async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});


app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch {
        res.status(400).json({ message: 'Invalid ID format' });
    }
});


app.post('/api/users', async (req, res) => {
    const { name, result, date, password } = req.body;
    if (!name || result == null || !date || !password)
        return res.status(400).json({ message: 'Missing required fields' });

    const newUser = new User({ name, result, date, password });
    await newUser.save();
    res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        result: newUser.result,
        date: newUser.date
    });
});


app.put('/api/users/:id', async (req, res) => {
    const updates = { ...req.body };
    if (updates.password) delete updates.password;

    try {
        const user = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        }).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch {
        res.status(400).json({ message: 'Error updating user' });
    }
});



app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch {
        res.status(400).json({ message: 'Invalid ID format' });
    }
});

module.exports = app;
