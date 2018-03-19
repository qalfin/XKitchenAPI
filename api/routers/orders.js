const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//order model
const Order = require('../models/order');

//get all
router.get('/', (req, res, next) => {
    Order.find()
        .populate('reference', 'reference guest')
        .populate('product', 'code initial name')
        .populate('user', 'badgeId nick fullName')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        });
});

//insert