
import express from 'express';
import { login, logout, register } from '../controllers/user';
import unwrapCookies from '../middleware/unwrapCookie';
const router = express.Router();
// import { login, auth } from '../controllers/login';
// import verifyJwt from '../middlewares/auth';

router.post('/register',register)
router.post('/login',login)
router.post('/logout',unwrapCookies,logout)


module.exports = router