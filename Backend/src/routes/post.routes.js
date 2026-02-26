const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require('multer');
const upload =  multer({Storage:multer.memoryStorage()})
const identifyUser = require('../middlewares/post.middleware');

// app.use(multer())

postRouter.post('/',upload.single("image"),identifyUser,postController.createPostController)

postRouter.get('/',identifyUser,postController.getPostController)

postRouter.get('/details/:postId',identifyUser,postController.getPostDetailsController)

postRouter.post('/like/:postId',identifyUser,postController.likePostController)

postRouter.post('/unlike/:postId',identifyUser,postController.unLikePostController)

postRouter.get('/feed', identifyUser, postController.getFeedController)


module.exports = postRouter;