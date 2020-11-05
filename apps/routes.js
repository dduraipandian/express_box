"use strict";

const express = require('express');
const views = require('./views');

const router = express.Router();

router.get("/sample", views.sampleView)

module.exports = router;