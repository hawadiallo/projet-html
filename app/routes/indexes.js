'use strict';

const express = require('express');
const router = express.Router();
const Indexes = require('../controllers/Indexes');

router.route('/')
    .get(Indexes.index)
    .post(Indexes.create);

module.exports = router;
