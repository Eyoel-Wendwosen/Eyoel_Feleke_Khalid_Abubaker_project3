const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('./model/user.model');
const BookModel = require('./model/book.model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./middleware/auth_middleware');
const router = express.Router();


const saltRounds = 10;
const SUPER_SECRET = process.env.SECRET

// login user 
router.post('/authenticate', function (request, response) {
    const { username, password } = request.body.user;
    console.log(password);

    return UserModel.getUserByUserName(username)
        .then(user => {
            const hashedPassword = user.password;
            bcrypt.compare(password, hashedPassword, function (err, success) {
                if (err || !success) {
                    response.status(401).send("Error: username or password not correct");
                    return;
                }

                const payload = {
                    userId: user._id,
                    username: user.username
                };
                const token = jwt.sign(payload, SUPER_SECRET, {
                    expiresIn: '14d'
                });
                return response.cookie('token', token, { httpOnly: true })
                    .status(200).send(payload);

            });
        })
        .catch(error => {
            response.status(400).send(error);
        });
});


// logout user. 
router.post('/logout', auth_middleware, function (request, response) {
    const token = jwt.sign({}, SUPER_SECRET, {
        expiresIn: '0d'
    });

    return response.cookie('token', token, { httpOnly: true })
        .status(200).send();
});


// check if user is logged in. 
router.get('/isLoggedIn', auth_middleware, function (request, response) {
    const userDetail = {
        username: request.username,
        userId: request.userId
    }
    return response.status(200).send(userDetail);
});

// create a new user
router.post('/', function (request, response) {
    const { username, password } = request.body.user;

    if (!username || !password) {
        response.status(401).send("Missing username or password argument")
    }

    // hash password
    bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
        if (err) {
            return response.status(500).send(err);
        }

        const user = {
            ...request.body.user,
            password: hashedPassword
        }

        return UserModel.createUser(user)
            .then(dbResponse => {
                const username = dbResponse.username
                const payload = {
                    username: dbResponse.username,
                    userId: dbResponse._id
                }
                const token = jwt.sign(payload, SUPER_SECRET, {
                    expiresIn: '14d'
                });
                return response.cookie('token', token, { httpOnly: true })
                    .status(200).send(payload);

            })
            .catch(error => {
                response.status(400).send(`New Error: ${error}`)
            });
    });
});


router.get('/:userId', function (request, response) {
    const userId = request.params.userId;
    if (!userId) {
        response.status(400).send("invalid user id");
        return;
    }
    
    return UserModel.getUserByUserId(userId)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(500).send(error);
        });

    
});
// authenticated access

// get posts by a specific user
router.get('/:userId/book', auth_middleware, function (request, response) {

    const userId = request.params.userId;

    if (!userId) {
        response.status(400).send("invalid user id");
        return;
    }

    return BookModel.getBooksByUserId(userId)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(500).send(error);
        });
});

module.exports = router;