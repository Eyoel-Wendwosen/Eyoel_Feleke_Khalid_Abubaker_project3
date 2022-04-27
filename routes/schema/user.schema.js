const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
    email: String,
    interest: [String],
    imageUrl: String,
    numberOfListing: Number
}, {
    collection: 'users',
})

module.exports = UserSchema;