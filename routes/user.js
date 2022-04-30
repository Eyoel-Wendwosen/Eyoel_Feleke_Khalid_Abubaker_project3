const express = require('express');

const UserModel = require('./model/user.model');
const BookModel = require('./model/book.model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./middleware/auth_middleware');
const router = express.Router();


// login user 
router.post('/authenticate', function (request, response) {
    const { username, password } = request.body;

    return UserModel.getUserByUserName(username)
        .then(user => {
            if (user.password === password) {
                const payload = {
                    username: username,
                };
                const token = jwt.sign(payload, "SUPER_SECRET", {
                    expiresIn: '14d'
                });
                return response.cookie('token', token, { httpOnly: true })
                    .status(200).send({ username });
            }

            return response.status(401).send("Invalid password");
        })
        .catch(error => {
            response.status(400).send("There was an error");
        })
})


// logout user. 
router.post('/logout', auth_middleware, function (request, response) {
    const token = jwt.sign({}, "SUPER_SECRET", {
        expiresIn: '0d'
    });

    return response.cookie('token', token, { httpOnly: true })
        .status(200).send();
});


// check if user is logged in. 
router.get('/isLoggedIn', auth_middleware, function (request, response) {
    return response.status(200).send({ username: request.username });
});

// create a new user
router.post('/', function (request, response) {
    const { username, password } = request.body;

    if (!username || !password) {
        response.status(401).send("Missing username or password argument")
    }

    const user = {
        username,
        password
    }

    return UserModel.createUser(user)
        .then(dbResponse => {
            const username = dbResponse.username
            const token = jwt.sign(payload, "SUPER_SECRET", {
                expiresIn: '14d'
            });
            return response.cookie('token', token, { httpOnly: true })
                .status(200).send({ username });

        })
        .catch(error => {
            response.status(400).send(`New Error: ${error}`)
        })
});


// authenticated access

// get posts by a specific user
router.get('/:userId/book', function (request, response) {
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