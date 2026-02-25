const postModel = require("../models/post.model");
const likeModel = require('../models/like.model')
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");


const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "insta_clone_posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created sucessfully.",
    post,
  });
}
const getPostController = async (req, res) => {
  
  const userId = req.user.id;
  const posts = await postModel.find({
    user: userId,
  });
  res.status(200).json({
    message: "Fetched Sucessfully",
    posts,
  });
};
const getPostDetailsController = async (req, res) => {
  // const params = req.params
  
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(400).json({
        message: "No post available"
    })
  }
  if(post.user.toString() !== userId){
    return res.status(404).json({
        message: "You cant access that post since its not yours"
    })
  }
  res.status(200).json({
    message: "Fetched sucessfully",
    post
  })

};
const likePostController = async (req,res)=>{
const username = req.user.username;
const postId = req.params.postId;

const post = await postModel.findById(postId);
if(!post){
  return res.status(404).json({
    message: "The post you trying to like doesnt exist"
  })
}
 const isAlreadyLiked = await likeModel.findOne({
      post: postId,
      user: username
    });
    if(isAlreadyLiked){
      return res.status(400).json({
        message : "You already liked this post"
      })
    }
const like = await likeModel.create({
  post: postId,
  user: username
})
res.status(200).json({
  message: " You liked this post",
  like
})
}

const getFeedController = async (req, res)=>{
  const user = req.user;
  const posts = await Promise.all((await postModel.find().populate("user").lean())
  .map(async(post)=>{
const isLiked = await likeModel.findOne({
  user: user.username,
  post: post._id
})

     post.isLiked = Boolean(isLiked)

     return post
  }))



  res.status(200).json({
    message: "Post Fetched sucessfully",
    posts
  })

}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  getFeedController
};
