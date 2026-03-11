const express = require('express');
const userController = require('../controllers/user.controller');
const identifyUser = require('../middlewares/post.middleware')

const userRouter = express.Router();

userRouter.post("/follow/:username", identifyUser, userController.followUserController)
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)
userRouter.get("/followstat", identifyUser, userController.followStatsController)
userRouter.get("/suggesteduser", identifyUser, userController.suggestedUsersController)



module.exports = userRouter;