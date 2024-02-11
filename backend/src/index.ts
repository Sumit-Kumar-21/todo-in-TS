import express from "express";
import cors from "cors"
import rootRouter from "./routes";

const port:number= 3000;

const app = express();

app.use(cors())
app.use(express.json())

app.use('/v1/api', rootRouter)

app.listen(port,()=>{console.log(`the port is started on port:${port}`);})