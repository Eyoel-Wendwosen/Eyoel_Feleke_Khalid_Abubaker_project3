const mongoose = require('mongoose');

const UserSchema = require('../schema/user.schema');

const UserModel = mongoose.model("User", UserSchema);

function createUser(user) {
    return UserModel.create(user);
}

function getUserByUserName(username) {
    const query = {
        username: username
    };
    return UserModel.findOne(query).exec();
}

function getUserByUserId(userId) {
    return UserModel.findById(userId).exec();
}

function editUserById(userId, user) {
    const query = {
        _id: userId
    }
    return UserModel.findOneAndUpdate(query, user).exec();
}

module.exports = {
    createUser,
    getUserByUserName,
    editUserById,
    getUserByUserId
}