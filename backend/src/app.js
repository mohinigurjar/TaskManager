const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth.route");
const taskRouter = require("./routes/task.route");

const app = express();

//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

//routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/task', taskRouter);

module.exports = app;