const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/userModel');
const ObjectId = require('mongoose').Types.ObjectId;

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

// Read all users
router.get('/read', (req, res, next) => {
    User.find((err, doc) => {
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in retrieving User list: ' +JSON.stringify(err, undefined, 2))
        }
    })
})

// Update User
router.put('/update/:id', (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record of given Id ' +`${req.params.id}`)
    }

    let updatedUser = {
        email: req.body.email,
        password: req.body.password,
        name : req.body.name,
        // status: req.body.status,
        role: req.body.role,
    };

    User.findByIdAndUpdate(req.params.id, {$set: updatedUser}, {new: true}, (err, doc) => {
        if(!err) {res.send.doc}
        else{console.log('Error in updating user info: ' +JSON.stringify(err, undefined, 2));}
    });
    
});

// Delete User
router.delete('/delete/:id', (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record of given Id ' +`${req.params.id}`)
    }

    User.findByIdAndRemove(req.params.id, {$set: updatedUser}, {new: true}, (err, doc) => {
        if(!err) {res.send.doc}
        else{console.log('Error in Deleting user: ' +JSON.stringify(err, undefined, 2));}
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

// Checks if User exists using the ID
router.get('/readbyid/:id', (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record of given Id ' +`${req.params.id}`)
    }
    User.getUserById(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }else{
            console.log('Error in retrieving User: ' +JSON.stringify(err, undefined, 2))
        }
    });
})

module.exports = router;