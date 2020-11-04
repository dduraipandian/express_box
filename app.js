'use strict';

const winston = require('./server/logger');
const settings = require('./server/settings');
const appConfig = require('./apps/app_config');
const { app, startServer } = require('./server/server');

winston.info("Sample application configuraiton: %s", appConfig.sampleConfig);
winston.info("Sample url to try %s", `http://localhost:${settings.APP_PORT}/sample`)
app.get("/sample", (request, response, next) => {
    response.send("ok");
})

startServer();