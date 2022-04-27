const mongoose = require('mongoose');

const HomeSchema = require('../schema/home.schema');

const HomeModel = mongoose.model("Home", HomeSchema);

function createHome(home) {
    return HomeModel.create(home);
}

function getHomesByUsername(username) {
    return HomeModel.find({
        owner: username
    }).exec();
}

function getAllHomes() {
    return HomeModel.find().exec();
}

function getHomeById(id) {
    return HomeModel.findById(id).exec();
}

module.exports = {
    createHome,
    getAllHomes,
    getHomeById,
    getHomesByUsername,
}