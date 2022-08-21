const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String
});

const UserModel = mongoose.model('users', userSchema);

module.exports = {
    UserModel
};
