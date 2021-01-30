const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/userModel');

// Create User
router.post('/create', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name : req.body.name,
        status: true,
        role: req.body.role,
    });

    User.addUser(newUser, (err, userModel) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'User Registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserbyEmail(email, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not Found!'});
        }

        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 1800 //1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        status: user.status,
                        role: user.role
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong Password! '})
            }
        });
    });
});

// Profile
router.get('/profile',passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({
        user: req.user
    });
});

module.exports = router;