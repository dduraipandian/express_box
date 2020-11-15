"use strict";

const path = require('path');

const APP_ROOT = require.main.path;

const APP_PORT = process.env.PORT || 3001;
const APP_NAME = path.basename(APP_ROOT);
const LOGLEVEL = process.env.LOGLEVEL || "info";

const DATABASE_URL = process.env.DATABASE_URL || null;
const EMAIL_SERVER = process.env.EMAIL_SERVER || null;
let MAILER_CONFIG;

if(EMAIL_SERVER){
    const EMAIL_PORT = process.env.EMAIL_PORT || 587;
    const EMAIL_HOST_USER = process.env.EMAIL_HOST_USER;
    const EMAIL_HOST_PASSWORD = process.env.EMAIL_HOST_PASSWORD;
    let EMAIL_SUBJECT_PREFIX = process.env.EMAIL_SUBJECT_PREFIX ? `[${EMAIL_SUBJECT_PREFIX}] `: '';
    EMAIL_SUBJECT_PREFIX = `[${APP_NAME.toUpperCase()}] ${EMAIL_SUBJECT_PREFIX}`;
    MAILER_CONFIG = {EMAIL_SERVER, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, EMAIL_SUBJECT_PREFIX}
}

module.exports = {
    APP_ROOT,
    APP_PORT,
    APP_NAME,
    LOGLEVEL,
    DATABASE_URL
}

if(MAILER_CONFIG) module.exports['MAILER_CONFIG'] = MAILER_CONFIG