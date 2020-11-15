"use strict";

const webModel = require('../models/web');

const webView = (request, response, next) => {
    const web = new webModel('web request');
    web.save()
    return response.send(web.message);
}

module.exports = {
    webView
}