const express = require('express');
const auth_middleware = require('./middleware/auth_middleware');

const HomeModel = require('./model/home.model');

const router = express.Router();


router.get('/', auth_middleware, function(request, response) {

    const username = request.username;

    return HomeModel.getHomesByUsername(username)
        .then(allHomes => {
            response.status(200).send(allHomes)
        })
        .catch(error => {
            response.status(400).send(error)
        })

})

router.get('/:homeId', function(request, response) {

    const homeId = request.params.homeId

    return HomeModel.getHomeById(homeId)
        .then(home => {
                response.status(200).send(home);
        })
        .catch(error => {
            response.status(400).send(error);
        });
});

router.post('/', auth_middleware, function(request, response) {
    const homeAddress = request.body.address;
    const username = request.username;

    if (!homeAddress) {
        response.status(401).send("Missing home address argument")
    }

    const home = {
        owner: username,
        address: homeAddress, 
    }

    return HomeModel.createHome(home)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

module.exports = router;