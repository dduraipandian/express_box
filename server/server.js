"use strict";

const {v4:uuidv4} = require('uuid');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');

const settings = require('./settings');
const mailer = require('./mailer');
const winston = require('./logger');
const utils = require('../helpers/utils');
const {connectToDB} = require('./database');

const app = express();
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
        return false
    }
    return compression.filter(req, res);
}

morgan.token('requestID', (req, res, param) => req._requestID);
app.use((req, res, next) => { req._requestID = uuidv4(); next();})
app.use(morgan(':requestID :method :url :status :res[content-length] - :response-time ms', { stream: winston.stream }));
app.use(compression({filter: shouldCompress}));
app.use(bodyParser.json());
app.use(express.static(path.join(settings.APP_ROOT, 'public')))

const defaultError404 = (request, response, next) => {
    // return response.status(404).send("not a valid request.");
    return response.status(404).sendFile(path.join(settings.VIEW_PATH, "404.html"));
}

const defaultErrorHandler = (err, req, res, next) => {
    winston.error('Request: %s, %s', req, err.stack);
    try{
        let subject = `${err}`;
        const htmlOutput = utils.getHtmlOutput(err.stack);
        const requestData = utils.getHtmlOutput(utils.requestToJson(req));
        mailer.sendMail({
            from: 'fromEmail@gmail.com', // sender address
            to: "toEmail@gmail.com", // list of receivers
            subject: subject, // Subject line
            html: `<b>${subject}</b><br/><br/>
                    <b style="color: red">Exception:</b><p>${htmlOutput}</p><br/>
                    <b>Request Data:</b> <br/><pre>${requestData}</pre><br/>
                    `, // html body
        }).catch(err => winston.error(err))
    } catch(error){
        winston.error(error.stack);
    }
    if(!res.headersSent)
        return res.status(500).send("not able to process request.");
}

const listen = () => {
    winston.info(`Application - ${settings.APP_NAME.toLocaleUpperCase()} is running on port ${settings.APP_PORT}`);
        app.listen(settings.APP_PORT);
}

const startServer = ({error404=null, errorHandler=null, callback=null}) => {
    error404 = error404? error404: defaultError404;
    errorHandler = errorHandler? errorHandler: defaultErrorHandler;

    app.use("*", error404);
    app.use(errorHandler);

    connectToDB(() => {
        if(callback) callback();
        listen();
    });
}

module.exports = {
    app,
    startServer
}