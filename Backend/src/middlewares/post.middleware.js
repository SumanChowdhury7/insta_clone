const jwt = require("jsonwebtoken");
const redis = require('../config/cache')

const identifyUser = async (req,res,next)=>{
const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please log in to continue",
    });
  }

  const isBlacklisted = await redis.get(token);

if(isBlacklisted){
    return res.status(401).json({
        message: "Unauthorized"
    })
}
  let decoded;
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }catch(err){
    return res.status(403).json({
        message: "Invalid user."
    })
  }
  req.user = decoded;
  next();
}

module.exports = identifyUser;