const express = require('express');
const User = require('../../model/UserSchema'); 
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
  }));
  
app.use(express.json());
app.use(express.urlencoded({extended:true}))

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



app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      const { password: _, ...userWithoutPassword } = user.toObject();
      res.json(userWithoutPassword);
  
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });


app.post('/api/users', async (req, res) => {
    console.log("Creating user with data:", req.body);
    const { name, email, date, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: 'Missing required fields' });

    const newUser = new User({ name, email, date, password });
    await newUser.save();
    res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
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
