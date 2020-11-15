"use strict";

const settings = require('./settings');

const isMailConfigured = settings.MAILER_CONFIG || false;

let mailer;
if(isMailConfigured){
    const nodemailer = require('nodemailer');

    mailer = nodemailer.createTransport({
        host: settings.MAILER_CONFIG.EMAIL_SERVER,
        port: settings.MAILER_CONFIG.EMAIL_PORT,
        secure: settings.MAILER_CONFIG.EMAIL_PORT === 465 ? true: false,
        auth: {
        user: settings.MAILER_CONFIG.EMAIL_HOST_USER,
        pass: settings.MAILER_CONFIG.EMAIL_HOST_PASSWORD
        }
    });
}

function sendMail(opts, callback=null){
    if(mailer){
        opts.subject = settings.MAILER_CONFIG.EMAIL_SUBJECT_PREFIX + opts.subject;
        if(callback === null)
            return mailer.sendMail(opts);
        else
            return mailer.sendMail(opts, callback);
    }
    else{
        return new Promise((resolve, reject) => {
            reject(`Email is not set up for Application - ${settings.APP_NAME.toLocaleUpperCase()}`);
        })
    }
}

module.exports = {sendMail};