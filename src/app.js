const express = require('express');
const authRouter = require('./routes/auth.router');

const app = express();
const cookies = require("cookie-parser");
app.use(cookies());



app.use(express.json());


app.use('/api/auth', authRouter);
module.exports = app;