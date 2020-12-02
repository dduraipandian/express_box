"use strict";

const path = require('path');

const webModel = require('../models/web');
const settings = require('../../server/settings');

const webView = (request, response, next) => {
    const web = new webModel('web request');
    web.save()
    return response.send(web.message);
}

const htmlView = (request, response, next) => {
    response.sendFile(path.join(settings.VIEW_PATH, "home.html"));
}

module.exports = {
    webView,
    htmlView
}