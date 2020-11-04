const { Router } = require('express');
"use strict";

const express = require('express');
const router = express.Router();

router.get("/sample", (request, response, next) => {
    response.send("ok");
})

module.exports = router;