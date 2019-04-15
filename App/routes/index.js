let express = require('express');
router = express.Router();
let schemajs2 = require('../schema/schema2');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let fs = require('fs');

function Auth() {
    var JwtStrategy = require('passport-jwt').Strategy,
                                    ExtractJwt = require('passport-jwt').ExtractJwt;
    var passport = require('passport')
    var opts = {};
    var token;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({
            id: jwt_payload.sub
        }, function(err, user) {
            if (err) {
                return done(err, false);
                res.status(200).send(err)
            }
            if (user) {
                return done(null, user);
                res.status(200).send(user)
            } else {
                return done(null, false);
                res.status(200).send('Something')
                // or you could create a new account
            }
        });
    }));
}

function AfterAuth() {
    //Delete
    router.delete('/remove', async function(req, res) {
        Auth;
        const taskData = req.body.task;
        schemajs2.taskSchema.findOneAndRemove({
            task: taskData
        }, {
            _v: 0
        }).then(() => {
            console.log("Delete successful")
        }).catch(err => {
            console.log('ERROR ' + err)
        });
        res.status(200).send("Success Del");
    });

    //Save
    router.post('/create', async function(req, res) {
        var JwtStrategy = require('passport-jwt').Strategy,
                                        ExtractJwt = require('passport-jwt').ExtractJwt;
        var passport = require('passport')
        var opts = {};
        var token;
        var username;
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = 'AMG-GT AMG-GT3 VIPER-ACR VULCAN VENENO M2 M4 BRZ ';
        passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
            User.findOne({
                username:jwt_payload.username
            }, function(err, user) {
                if (err) {
                    res.status(400).send(err)
                }
                if (user) {
                    username = user
                    const taskData = req.body.task;
                    const statusData = req.body.status;
                    const toSave = {
                        task: taskData,
                        status: statusData,
                        username:username
                    };
                    const value = new schemajs2.taskSchema(toSave);w2
                    value.save().then(() => {
                        console.log("saved")
                    }).catch(err => {
                        console.log(err)
                    });
                    let id = value._id;
                    console.log('id = ' + id);
                    console.log('#its random');
                    res.status(200).send("Success Save ");
                } else {
                    res.status(200).send('Something')
                    // or you could create a new account
                }
            });
        }));

    });

    //Return
    router.get('/task', async function(req, res) {
        Auth;
        const taskData = req.body.task;
        let result = await schemajs2.taskSchema.find({
            task: taskData
        });
        if (result.length > 0) {
            result.forEach(function(task) {
                console.log('Info: ' + task);
                res.status(200).send(task);
            });
        } else res.status(200).send('No matches to your query');
    });
    router.get('/sorted', async function(req, res) {
        Auth;
        var id;
        var result = await schemajs2.taskSchema.find({
            _id: id
        }).then(() => {
            console.log('Might work')
        }).catch(err => {
            console.log(err)
        });
        result.sort(function(a, b) {
            var nameA = a.name.toLowerCase(),
                                            nameB = b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            res.status(200).send(result);
            if (nameA > nameB)
                return 1;
            res.status(200).send(result);
            return 0; //default return value (no sorting)
        });
        res.status(200).send(result);
    });
    router.get('/status', async function(req, res) {
        Auth;
        const statusData = req.body.status;
        let result = await schemajs2.taskSchema.find({
            status: statusData
        });
        if (result.length > 0) {
            result.forEach(function(task) {
                console.log('Info: ' + task);
                res.status(200).send(task);
            });
        } else res.status(200).send('No matches to your query');
    });
    router.get('/byID', async function(req, res) {
        Auth;
        const idData = req.body._id;
        const result = await schemajs2.taskSchema.findOne({
            _id: idData
        });
        console.log(result);
        res.status(200).send(result);

    });

    //Update
    router.put('/updateTask', async function(req, res) {
        Auth;
        const taskData = req.body.task;
        const id = req.body._id;
        await schemajs2.taskSchema.findOneAndUpdate({
            _id: id
        }, {
            task: taskData
        }).then(() => {
            console.log('Updated')
        }).catch(err => {
            console.log('You have encountered an error: ' + err);
        });
        res.status(200).send("Updated");
    });
    router.put('/updateStatus', async function(req, res) {
        Auth;
        const statusData = req.body.status;
        const id = req.body._id;
        await schemajs2.taskSchema.findOneAndUpdate({
            _id: id
        }, {
            status: statusData
        }).then(() => {
            console.log('Updated')
        }).catch(err => {
            console.log('You have encountered an error: ' + err);
        });
        res.status(200).send("Updated");
    });
}

router.post('/signup', async function(req, res) {
    var oldPassword = req.body.password;
    var username = req.body.username;
    bcrypt.hash(oldPassword, 10, async function(err, hash) {
        let password = hash;
        var UserData = {
            username: username,
            password: password
        };

        new schemajs2.Schema(UserData).save().then(() => {
            console.log('Saved and Hashed')
            res.status(200).send('Account Created')
        }).catch(err => {
            console.log(err);
            res.status(200).send('There was an error: ' + err);
        });
    });
});
router.post('/signin', async function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var payload = {
        username: username,
        password: password
    }
    var algorithm = {
        algorithm: "MD5",
        expiresIn: "30d"
    }
    var token = jwt.sign(payload, 'AMG-GT AMG-GT3 VIPER-ACR VULCAN VENENO M2 M4 BRZ ');
    var query = await schemajs2.Schema.findOne({
        username: username
    });
    if (query && query._id) {
        await bcrypt.compare(password, query.password, function(err, isMatched) {
            if (isMatched) {
                console.log('Signed in Successfully');
                AfterAuth();
                res.status(200).send('Password Correct and Authenticated. YAHOOOOOOOOOOOOOOOO!' + token);
            } else if (err) {
                console.log(err);
                throw (err)
            } else {
                console.log('Wrong Password')
                res.status(200).send('Password Incorrect.')
            }
        });
    } else {
        res.status(200).send("User not found")
    }
});
const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
if (isInLambda) {
    const serverlessExpress = require('aws-serverless-express');
    const server = serverlessExpress.createServer(app);
    exports.main = (event, context) => serverlessExpress.proxy(server, event, context)
} else {
    app.listen(3000, () => console.log(`Listening on 3000`));
}

module.exports = router;