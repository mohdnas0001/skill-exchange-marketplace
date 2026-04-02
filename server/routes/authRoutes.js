const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);
router.get('/me', protect, getMe);

module.exports = router;
