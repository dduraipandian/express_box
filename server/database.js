"use strict";

const mongodb = require('mongodb');
const winston = require('./logger');
const settings = require('./settings');
const MongoClient = mongodb.MongoClient;

let _client;

const connectToDB = callback => {
    MongoClient.connect(settings.DATABASE_URL, { useUnifiedTopology: true })
    .then(client => {
        winston.info("connected to mongo db.");
        _client = client;
        callback();
    })
    .catch( error => {
        winston.error("Not able to connect to database. Failed to start the application.");
        winston.error(error.stack)
        throw error;
    });
}

const getDatabase = db => _client.db(db);

module.exports = {connectToDB, getDatabase};