"use strict";

const path = require('path');

const APP_ROOT = require.main.path;

const APP_PORT = process.env.PORT || 3001;
const APP_NAME = path.basename(APP_ROOT);
const LOGLEVEL = process.env.LOGLEVEL || "info";


module.exports = {
    APP_ROOT,
    APP_PORT,
    APP_NAME,
    LOGLEVEL
}