"use strict";

const express = require('express');
const views = require('./controllers/web');

const router = express.Router();

router.get("/sample", views.webView)
router.get("/html", views.htmlView)

module.exports = router;