
import express from 'express';
import { login, logout, register, ping } from '../controllers/user';
import checkAuth from '../middleware/checkAuth';
import { add, del, get, getAll, setHairColor, setHeight, setSkinColor, setWeight } from '../controllers/models';
const router = express.Router();


router.get('/:id', checkAuth,get);
router.get('/all', checkAuth,getAll);


router.put('/add', checkAuth,add);
router.put('/add_lang/:id/:name', checkAuth,getAll); //todo
router.put('/add_hb/:id/:name', checkAuth,getAll); //todo

router.put('/:id/height/:value', checkAuth,setHeight);  // cm todo
router.put('/:id/weight/:value', checkAuth,setWeight); // kg todo
router.put('/:id/hairColor/:value', checkAuth,setHairColor);  // hex code xxxxxx todo
router.put('/:id/skinColor/:value', checkAuth,setSkinColor);  // hex code xxxxxx todo

router.delete('/:id', checkAuth,del);
// router.delete('/all', checkAuth);

module.exports = router