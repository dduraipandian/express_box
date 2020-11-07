"use strict";

const winston = require('./logger');
const settings = require('./settings');

let _client;

const isDBConfigured = settings.DATABASE_URL;

const connectToDB = callback => {
    if(isDBConfigured){
        const mongodb = require('mongodb');
        const MongoClient = mongodb.MongoClient;

        MongoClient.connect(settings.DATABASE_URL, { useUnifiedTopology: true })
            .then(client => {
                winston.info("connected to mongo db.");
                _client = client;
                callback();
            })
            .catch( error => {
                let err = "Not able to connect to database. Failed to start the application."
                winston.error(err);
                throw new Error(error);
            });
    } else {
        callback();
    }
}

const getDatabase = db => {
    if(!_client){
        const err = `Database is not set up for Application - ${settings.APP_NAME.toLocaleUpperCase()}`;
        winston.error(err);
        throw new Error(err);
    }
    return _client.db(db)
};

module.exports = {connectToDB, getDatabase};