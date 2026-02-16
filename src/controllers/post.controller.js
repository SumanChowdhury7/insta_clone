const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  console.log(req.body, req.file);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please log in to continue",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized user.",
    });
  }

  console.log(decoded);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "insta_clone_posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post created sucessfully.",
    post,
  });
}
const getPostController = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please log in to continue",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid user",
    });
  }
  const userId = decoded.id;
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
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please log in to continue",
    });
  }
  let decoded;
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }catch(err){
    return res.status(403).json({
        message: "Invalid user."
    })
  }
  const userId = decoded.id;
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
    message: "fetched sucessfully",
    post
  })

};

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
