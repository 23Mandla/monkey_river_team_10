const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/userController');

router.post('/', createUser);

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);


module.exports = router;