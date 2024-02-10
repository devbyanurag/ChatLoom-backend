// src/app.ts
import express, {  } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db';
import bodyParser from 'body-parser';
import { router_user } from './routes/user';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
connectDB();

// const allowedOrigins = ['http://frontendapp1.com', 'http://frontendapp2.com'];
const corsOptions = {
    //   origin: allowedOrigins,
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions))
app.use(bodyParser.json());


app.use('/user',router_user);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
