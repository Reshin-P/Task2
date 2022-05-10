import express from "express";
import cors from 'cors'
import UserRouter from './Routes/UserRouter.js'
import dotenv from 'dotenv'
import connectDB from "./Config/Mongoose-Config.js";
import { errorHandler, notFound } from './Middileware/errorHandlerMiddleware.js'
import ProductRouter from './Routes/ProductRouter.js'
import bodyParser from "body-parser";



const app = express();
dotenv.config()
connectDB()
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    methods: "*",
    origin: "*"
}))

app.use('/api/user', UserRouter)
app.use('/api/product', ProductRouter)

app.use(notFound)
app.use(errorHandler)


app.listen(process.env.SERVER_PORT, () => {
    console.log("server running on ", process.env.SERVER_PORT);
})