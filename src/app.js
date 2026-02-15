const express = require('express');
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');

const app = express();
const cookies = require("cookie-parser");
app.use(cookies());



app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
module.exports = app;