"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Package imports */
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
//ENVIRONNEMENT//
let ENV = process.env.ENVIRONNEMENT || "";
if (ENV == "production") {
    dotenv_1.default.config({
        path: path_1.default.join(__dirname, '..', '.env.production'),
        override: true,
        debug: true
    });
}
else {
    dotenv_1.default.config({
        path: path_1.default.join(__dirname, '..', '.env'),
        override: true,
        debug: true
    });
}
const PORT = 3535;
const whitelist = ['https://liolle.github.io', 'http://localhost:5173', 'http://localhost:4173', 'https://localhost:5173', 'https://localhost:4173', "https://google.com",
    'https://liolle.github.io/', 'http://localhost:5173/', 'http://localhost:4173/', 'https://localhost:5173/', 'https://localhost:4173/', "https://google.com/"];
var corsOptions = {
    credentials: true,
    origin: whitelist,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization, application/json',
};
//MIDDLEWARE//
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
console.log("checking cors");
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)(corsOptions));
//ROUTES//
console.log("routing");
app.use('/users', require('./routes/users.routes'));
app.use('/models', require('./routes/profiles.routes'));
app.listen(PORT, () => {
    let ENV = process.env.ENVIRONNEMENT == 'production' ? 'PRODUCTION' : 'DEVELOPMENT';
    console.log(`\nServer running on ---> http://localhost:${PORT} <${ENV}>\n`);
});
