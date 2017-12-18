var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    //gallery = mongoose.model('Gallery'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    config = require('../../config/config');



//var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/galleries/user/:userId').get( function (req, res, next) {
        logger.log('Get all galleries', 'verbose');

        var query = gallery.find({user: req.params.userId})
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: 'No galleries' });
                }
            })
            .catch(err => {
                return next(err);
            });
    })




    router.route('/galleries/:todoId').get(function (req, res, next) {
        logger.log('Get gallery ' + req.params.todoId, 'verbose');

        Gallery.findById(req.params.todoId)
            .then(todo => {
                if (todo) {
                    res.status(200).json(todo);
                } else {
                    res.status(404).json({ message: "No gallery found" });
                }
            })
            .catch(error => {
                return next(error);
            });
    });


    //Post
    router.route('/galleries').post( function (req, res, next) {
        logger.log('Create todo', 'verbose');

        var todo = new gallery(req.body);
        todo.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                return next(err);
            });
    })
    // router.post('/todos', function (req, res, next) {
    //     logger.log('Create User', 'verbose');
    //     var user = new Gallery(req.body);
    //     user.save()
    //     .then(result => {
    //         res.status(201).json(result);
    //     })
    //     .catch( err => {
    //        return next(err);
    //     });
    //   })
}

//Put Handler 

router.route('/galleries/:todoId').put(function (req, res, next) {
    logger.log('Update gallery ' + req.params.todoId, 'verbose');

    gallery.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true, multi: false })
        .then(todo => {
            res.status(200).json(todo);
        })
        .catch(error => {
            return next(error);
        });
});
// router.put('/todos/password/:userId', function(req, res, next){
//     logger.log('Update todos ' + req.params.userId, 'verbose');

//     User.findById(req.params.userId)
//         .exec()
//         .then(function (user) {
//             if (req.body.password !== undefined) {
//                 user.password = req.body.password;
//             }

//             user.save()
//                 .then(function (user) {
//                     res.status(200).json(user);
//                 })
//                 .catch(function (err) {
//                     return next(err);
//                 });
//         })
//         .catch(function (err) {
//             return next(err);
//         });
// });

//Delete Handler
router.route('/galleries/:todoId').delete(function (req, res, next) {
    logger.log('Delete todo ' + req.params.todoId, 'verbose');

    Gallery.remove({ _id: req.params.todoId })
        .then(todo => {
            res.status(200).json({ msg: "Gallery Deleted" });
        })
        .catch(error => {
            return next(error);
        });


});

//     router.route('/todos/:userId').delete(function(req, res, next){
//         logger.log('Delete todos' + req.params.userId, 'verbose');
//         res.status(200).json({message: "Delete user" + req.params.userId});
//     });

//     router.post('/login', function(req, res, next){
//         console.log(req.body);
//         var email = req.body.email
//         var password = req.body.password;

//         var obj = {'email' : email, 'password' : password};
//       res.status(201).json(obj);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = config.uploads + req.params.userId + "/";
        mkdirp(path, function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                cb(null, path);
            }
        });
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname.split('.');
        cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
    }
});

var upload = multer({ storage: storage });
router.post('/galleries/upload/:userId/:todoId', upload.any(), function (req, res, next) {
    logger.log('Upload file for gallery ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');

    gallery.findById(req.params.todoId, function (err, todo) {
        if (err) {
            return next(err);
        } else {
            if (req.files) {
                todo.file = {
                    filename: req.files[0].filename,
                    originalName: req.files[0].originalname,
                    dateUploaded: new Date()
                };
            }
            todo.save()
                .then(todo => {
                    res.status(200).json(todo);
                })
                .catch(error => {
                    return next(error);
                });
        }
    });
});
