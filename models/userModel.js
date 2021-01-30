const mongoose = require('mongoose');
const bcyrpt = require('bcryptjs');
const config = require('../config/database');

const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: false
    },
    role: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserbyEmail = function(email, callback) {
    const query = {email: email}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcyrpt.genSalt(10, (err, salt) => {
        bcyrpt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcyrpt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}