
import express from 'express';
import { login, logout, register, ping } from '../controllers/user';
import checkAuth from '../middleware/checkAuth';
const router = express.Router();
// import { login, auth } from '../controllers/login';
// import verifyJwt from '../middlewares/auth';

router.post('/register',register)
router.post('/login',login)
router.post('/logout',checkAuth,logout)
router.post('/auth',checkAuth,ping)


module.exports = router