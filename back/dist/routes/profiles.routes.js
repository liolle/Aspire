"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../middleware/checkAuth"));
const models_1 = require("../controllers/models");
const router = express_1.default.Router();
router.get('/all', checkAuth_1.default, models_1.getAll);
router.get('/:id', checkAuth_1.default, models_1.get);
router.put('/add', checkAuth_1.default, models_1.add);
router.put('/add_lang/:id/:name', checkAuth_1.default, models_1.getAll); //todo
router.put('/add_hb/:id/:name', checkAuth_1.default, models_1.getAll); //todo
router.put('/:id/height/:value', checkAuth_1.default, models_1.setHeight); // cm todo
router.put('/:id/weight/:value', checkAuth_1.default, models_1.setWeight); // kg todo
router.put('/:id/hairColor/:value', checkAuth_1.default, models_1.setHairColor); // hex code xxxxxx todo
router.put('/:id/skinColor/:value', checkAuth_1.default, models_1.setSkinColor); // hex code xxxxxx todo
router.delete('/:id', checkAuth_1.default, models_1.del);
// router.delete('/all', checkAuth);
module.exports = router;
