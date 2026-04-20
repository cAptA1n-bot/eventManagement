import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser';
import connectDB from "./config/database.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import eventRouter from "./routes/eventRoutes.js"
import registrationRouter from "./routes/registrationRoutes.js";
dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/users", authRouter);
app.use("/events", eventRouter);
app.use("/registrations", registrationRouter);


connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(err.message);
    })