/* Package imports */
import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path'
import dotenv from "dotenv";


//ENVIRONNEMENT//


let ENV = process.env.ENVIRONNEMENT || ""
if (ENV == "production"){

    dotenv.config(
        { 
            path: path.join(__dirname, '..','.env.production') ,
            override: true,
            debug: true
        }
    );

}
else{

    
    dotenv.config(
        { 
            path: path.join(__dirname, '..','.env') ,
            override: true,
            debug: true
        }
    );
}


const PORT = 3535

const  whitelist = ['https://liolle.github.io','http://localhost:5173','http://localhost:4173','https://localhost:5173','https://localhost:4173',"https://google.com",
'https://liolle.github.io/','http://localhost:5173/','http://localhost:4173/','https://localhost:5173/','https://localhost:4173/',"https://google.com/"]

var corsOptions = {
  credentials: true,
  origin : whitelist,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization, application/json',
}

//MIDDLEWARE//

const app = express();
app.use(express.json())
app.use(cookieParser())
console.log("checking cors");
app.use(cors());

app.options('*', cors(corsOptions));

//ROUTES//
console.log("routing");
app.use('/users',require('./routes/users.routes'))
app.use('/models',require('./routes/profiles.routes'))


app.listen(PORT,() =>{
    let ENV = process.env.ENVIRONNEMENT == 'production' ? 'PRODUCTION':'DEVELOPMENT' 
    console.log( `\nServer running on ---> http://localhost:${PORT} <${ENV}>\n` )
});