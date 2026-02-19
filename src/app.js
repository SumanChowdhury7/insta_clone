const express = require('express');



const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');

const app = express();
const cookies = require("cookie-parser");
app.use(cookies());



app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter)
module.exports = app;