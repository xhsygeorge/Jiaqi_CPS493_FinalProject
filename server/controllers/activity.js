const express = require('express');
const activities = require('../models/activity');

const app = express.Router();

app
    .get('/', (req, res, next) => {
        activities.getActivities()
        .then(x=>res.status(200).send(x))
        .catch(next)
    })
    .get('/:id', (req, res, next) => {
        activities.getActivity(req.params.id)
        .then(x=>res.status(200).send(x))
        .catch(next)
        if (activity) {
            res.status(200).send(activity);
        } else {
            res.status(404).send('Activity not found');
        }
    })
    .post('/addActivity', (req, res, next) => {
        activities.addActivity()
        .then(x=>res.status(200).send(x))
        .catch(next)
    })
    .patch('/:id', (req, res, next) => {
        activities.updateActivity(req.params.id, req.body)
        .then(x=> res.status(200).send(x))
        .catch(next);
    });


module.exports = app;