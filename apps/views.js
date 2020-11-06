"use strict";

function sampleView(request, response, next) {
    return response.send("app router");
}

module.exports = {
    sampleView
}