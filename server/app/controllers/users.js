
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
    mongoose = require('mongoose')
    User = mongoose.model('User')
    passportService = require('../../config/passport'),
    passport = require('passport')

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

// Why do I uses module.exports here? Why do I need to export these?
// So we can import them...?
module.exports = function (app, config) {
    app.use('/api', router);
    // this passes the req, res, next object

    router.post('/users', function (req, res, next) {
        console.log('LKDFJSLJD')
        logger.log('Create User', 'verbose');
        var user = new User(req.body);
        user.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                return next(err);
            });
    })

    router.route('/users/login').post(requireLogin, login);

    //Get All Users
    router.route('/users').get(requireAuth, function (req, res, next) {
        logger.log('Get all users', 'verbose');

        var query = User.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: 'No users' });
                }
            })
            .catch(err => {
                return next(err);
            });
    })

    //Get a User
    router.get('/users/:userId', function (req, res, next) {
                logger.log('Get user ' + req.params.userId, 'verbose');
                User.findById(req.params.userId)
                        .then(user => {
                                if (user) {
                                        res.status(200).json(user);
                                } else {
                                        res.status(404).json({ message: "No user found" });
                                }
                        })
                        .catch(error => {
                                return next(error);
                        });
        });

//Update User
    router.route('/users/update/userId').put(function (req, res, next) {
        logger.log('Update users' + req.params.userId, 'verbose');
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true, multi: false })
            .then(user => {
                res.status(200).json(user);
            })
            .catch(error => {
                return next(error);
            });
    });


    /* router.route('/users/password/:userId').put(function(req, res, next){
        logger.log('Update user password' + req.params.userId, 'verbose');
        res.status(200).json({message: "Update user password" + req.params.userId});
    });
    */


    //Put Handler 
    router.put('/users/password/:userId', function (req, res, next) {
        logger.log('Update user ' + req.params.userId, 'verbose');

        User.findById(req.params.userId)
            .exec()
            .then(function (user) {
                if (req.body.password !== undefined) {
                    user.password = req.body.password;
                }

                user.save()
                    .then(function (user) {
                        res.status(200).json(user);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });

    //Delete Handler
    router.route('/users/:userId').delete(function(req, res, next){
        logger.log('Delete user ' + req.params.userId, 'verbose');
    
        User.remove({ _id: req.params.userId })
            .then(user => {
                res.status(200).json({msg: "User Deleted"});
            })
            .catch(error => {
                return next(error);
            });
    
    
            res.status(200).json({message: 'Delete user ' + req.params.userId});
        });
};





