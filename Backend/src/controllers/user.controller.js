const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

const followUserController = async (req, res) => {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followeeUsername === followerUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }
  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });
  if (!isFolloweeExist) {
    return res.status(404).json({
      message: `${followeeUsername} doesn't exist`,
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  if (isAlreadyFollowing) {
    return res.status(400).json({
      message: `You are already following ${followeeUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });
  res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    follow: followRecord,
  });
};

const unfollowUserController = async (req, res) => {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;
  if (followeeUsername === followerUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }
  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });
  if (!isFolloweeExist) {
    return res.status(404).json({
      message: `${followeeUsername} doesn't exist`,
    });
  }
  if(!isUserFollowing){
    return res.status(200).json({
        message: `You are not following ${followeeUsername}`
    })
  }
  await followModel.findByIdAndDelete(isUserFollowing._id);
  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`
  })
};

const followStatsController = async(req, res) =>{
  const username = req.user.username;

  const followerCount = await followModel.countDocuments({
    followee: username
  })

  const followingCount = await followModel.countDocuments({
    follower:username
  })

  res.status(200).json({
    message:"Fetched Successfully",
followerCount,
followingCount
  })
}
const suggestedUsersController = async (req, res) => {
  const username = req.user.username;

  const following = await followModel.find({
    follower: username
  });

  const followingList = following.map(f => f.followee);

  const suggestedUsers = await userModel.find({
    username: { $nin: [...followingList, username] }
  }).limit(10);

  res.status(200).json({
    message: "Suggested users fetched",
    users: suggestedUsers
  });
};
module.exports = {
  followUserController,
  unfollowUserController,
  followStatsController,
  suggestedUsersController
};
