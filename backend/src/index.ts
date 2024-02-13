import express from "express";
import dotenv from 'dotenv';

dotenv.config();
import cors from "cors"
import rootRouter from "./routes";



const port:number= 3000;

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/v1', rootRouter)

app.listen(port,()=>{console.log(`the port is started on port:${port}`);})