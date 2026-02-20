const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: [true, "User name already exist please choose another username"],
        required: [true,"Please enter a user name."]
    },
    email: {
        type: String,
        unique: [true, "Email already exist"],
        required: [true, "Email required"]
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1738980401922-70995a1b6ade?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;