const express = require('express');
const friends = require('../models/friends');

const app = express.Router();

app
    .get('/', (req, res, next) => {
        friends.getFriends()
        .then(x=>res.status(200).send(x))
        .catch(next)
    })
    .get('/:id', (req, res) => {
        friends.getFriend(+req.params.id)
        .then(x=>res.status(200).send(x))
        .catch(next)
        if (friend) {
            res.status(200).send(friend);
        } else {
            res.status(404).send('Friend not found');
        }
    })
    .post('/seed', (req, res, next) => {
        friends.seed()
        .then(x=>res.status(200).send(x))
        .catch(next)
    });


module.exports = app;