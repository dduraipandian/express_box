"use strict";

const express = require('express');
const views = require('./controllers/web');

const router = express.Router();

router.get("/sample", views.webView)

module.exports = router;