import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import router from './routes/user.js';
import {createClient} from 'redis';
import cookieParser from 'cookie-parser';
import cors from 'cors';



dotenv.config();

await connectDB();

const redisURL = process.env.REDIS_URL;
if(!redisURL){
    console.log("Missing Redis URL");
    process.exit(1);
};

export const redisClient = createClient({
    url: redisURL,
});

redisClient
.connect()
.then(()=>console.log("Redis Connected"))
.catch(console.error);


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
});