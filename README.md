# Express_box
Express Box application is boilerplate created from express, mongodb, morgan, winston logger, nodemailer and gives you a hand to setup your application quickly.

# Motivation
I come from python, Django background. I like how Django structures your application, follows DRY (Don't repeat yourself) principles, provides all the required features for the web development and let you use other libraries as well.

My goal, here, is not to invent such framework. I like the dajngo approach to structure things. So I am trying to build such template or skeleton app to fit web development approach by using already well-known libraries .

# Who will benefit from this application
1. If you are planning to use express for web, winston for logger, nodemailer for email and want to get started soon.
2. If you have experience with web development and nodejs, this will help you get started right away.
3. If you are interested in the way this application is structured, this will help.


# Table of Contents

- [Project structure](#Project-structure)
- [Integrated libraries and thier usage](#Integrated-libraries-and-thier-usage)
    * [Expressjs](#Expressjs)
        + [How to start your server](#How-to-start-your-server)
        + [How to add routes](#How-to-add-routes)
    * [Winston, Morgan](#Winston,-Morgan)
        + [How to log](#How-to-log)
    * [Nodemailer](#Winston,-Morgan)
        + [How to send email](#How-to-send-email)
    * [MongoDB](#MongoDB)
        + [How to mongodb collection in other places](#How-to-mongodb-collection-in-other-places)
    * [Aditional libraries](#aditional-libraries)
- [Environment variables](#Environment-variables)
    * [Defined Environment variables](#Defined-Environment-variables)
    * [Environment variables you can change](#Environment-variables-you-can-change)
    * [VSCode Debugger](#VSCode)
- [What should I do if you want to change](#What-should-I-do-if-you-want-to-change)
- [How to use this project](#How-to-use-this-project)
- [What will be future changes](#What-will-be-future-changes)


# Project structure
I tried to create a structure similar to django and kept standards followed for nodejs whereever i could.

    .
    ├── LICENSE
    ├── README.md
    ├── app.js --> contains master routes and starts the express application
    ├── apps
    │   ├── controllers
    │   │   └── web.js --> contains function for router controller
    │   ├── models
    │   │   └── web.js --> application models/objects
    │   ├── app_config.js --> app related environment variables
    │   ├── routes.js --> router configuration and improts form views
    ├── helpers
    │   └── utils.js --> generic function used in the application
    ├── logs
    │   └── express_box.log --> application log created by winston
    ├── package-lock.json
    ├── package.json
    └── server
        ├── database.js --> mongodb configuration
        ├── logger.js --> winston logger configurtion
        ├── mailer.js --> nodemailer configuration
        ├── server.js --> contains all express configuration
        └── settings.js --> processing environment variables and global settings for application

# Integrated libraries and thier usage

Below well established applications are brought together for this application.

## Expressjs
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

It has middleware integration feature to intercept request, response, error and routing features to route requests.

You can check about [expressjs](http://expressjs.com/) from official site.

Express configurations are kept under server/server.js.
1. compression is enabled for sending response.
2. Morgan is used for logging request/reponse.
3. By default, json body parser is used.
4. (extra) I have created middleware to create unique id for each request and storing in **req._requestID**. You can take advantage of that to track request logging and application logging for request.
5. (extra) Default 404(**defaultError404**), Error handler(**defaultErrorHandler**) are added to express.
6. (extra) Email will be sent from error handler if email server is configured.

### How to start your server
```node
node express_box/app.js
```

app.js have below way to start. It is little different than normal app.listen(port).
```javascript
const { app, startServer } = require('./server/server');
// application comes with default handler. But if you want to add your own, you can pass it with start server.
startServer(Error404, ErrorHandler)
```

### How to add routes
```javascript
// appRouter - is a another express router to seperate from master router to handle application specific routes.
const appRouter = require('./apps/routes');
const { app, startServer } = require('./server/server');
app.use('/api', appRouter);
```

## Winston, Morgan
winston is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs

morgan logger middleware logs request/reponse details to the logging.

This application sends morgan logging to winston logger to keep keep everything in a single place.

You can check about [winston](https://www.npmjs.com/package/winston), [morgan](https://www.npmjs.com/package/morgan) from official npm.

Winston configurations are kept under server/logger.js.
1. Logs are **rotated** after 10MB with date timestamp .
2. Max 200 files kept after rotation.
3. Logs are stored under express_box/logs/.

### How to log using winston
```javascript
// path should be relative to your script.
const winston = require('./logger');
winston.log("your logging")
```

## Nodemailer
Simpler mail library for sending emails. This is used to for sending error emails in the default error handler.

You can check about [nodemailer](https://nodemailer.com/) from official site.

Nodemailer configurations are kept under server/mailer.js.

1. To send email, you have to set couple of mandatory environment variables.

        EMAIL_SERVER - email server. Ex: smtp.gmail.com for gmail
        EMAIL_HOST_USER - user to authenticate
        EMAIL_HOST_PASSWORD - password to authenticate
        EMAIL_PORT - This is optional. If it is not provided, 587 port will be used
        EMAIL_SUBJECT_PREFIX - This is optional. If it provided, it will be added with email subject

        By default, you will get your email with your subject. APP_NAME is your application name.
        Example: [$APP_NAME$] your subject email here

        If you set EMAIL_SUBJECT_PREFIX = 'PRODUCTION', you will get below email.
        Example: [$APP_NAME$] [PRODUCTION] your subject email here

### How to send email

```javascript
// path should be relative to your script.
const mailer = require('./mailer');
const opts = {
    from: 'fromEmail@gmail.com', // sender address
    to: "toEmail@gmail.com", // list of receivers
    subject: "your subject", // Subject line
    text: 'your body', // text body
    html: 'your html body', // html body
}
mailer.sendMail(opts).catch(err => winston.error(err))
```

## MongoDB
MongoDB is widely used as backed for nodejs application and it goes well with concurrency with nodejs.

**Before start using, mongodb needs to be setup and service should be running.**

    DATABASE_URL - Mongo DB URI should be set as environment variable to avoid connection string or password in the scripts.

You can check [mongodb](https://docs.mongodb.com/drivers/node/) offical site for more details.

### How to mongodb collection in other places

This is sample model which saves dummy message to the database. Environment variable is included in the vscode lanch.json file.

```javascript
// path should be relative to your script.
const {getDatabase} = require('../../server/database');

class WebModel{

    constructor(message){
        this.message = message;
    }

    get db(){
        return getDatabase('web');
    }

    getCollection(name){
        return this.db.collection(name);
    }

    save() {
        const collection = this.getCollection('web_message')
        collection.insertOne({message: this.message});
    }
}

module.exports = WebModel;
```


## Aditional libraries

This application use additional libraries for express such as compression, body-parser, uuid.

# Environment variables

Environment variables are processed in the **server/settings.js**. You can add it there for your application.

To use it in other scripts.

```javascript
// path should be relative to your script.
const settings = require('./settings');
console.log(settings.APP_ROOT);
```
### Defined Environment variables

    APP_ROOT - Root of your project. (ex: express_box)
    APP_PORT - Port to run your server. Default port is 3001.
    APP_NAME - Project name. It is derived from root directory.

### Environment variables you can change

    LOGLEVEL - By default, info is set for logging.
    EMAIL_SERVER - email server. Ex: smtp.gmail.com for gmail
    EMAIL_HOST_USER - user to authenticate
    EMAIL_HOST_PASSWORD - password to authenticate
    EMAIL_PORT - This is optional. If it is not provided, 587 port will be used
    EMAIL_SUBJECT_PREFIX - This is optional. If it provided, it will be added with email subject

### VSCode Debugger
If you use vscode to run in your local, you can use existing **launch.json** and set environment variables there.

# What should I do if you want to change

All the server codes are really simple and straightforward. You can change it for your requirement.
Example:
1. If you want server static files, you can update server/server.js file and keep working.
2. If you want to change email subject prefix, you can update sendMail function in server/mailer.js file.
3. If you want to change the log format, server/logger.js is the location to look for.

# How to use this project

1. Clone the repositor from git.

    ```git
    git clone https://github.com/dduraipandian/express_box.git
    ```

2. Remove .git from express_box as you will be working as yours.

    ```shell
    cd express_box
    pwd # make sure you are in right path
    rm -rf .git
    cd ..
    mv express_box todo
    ```

3. Install npm packages.
    cd todo
    npm install

You can start running the app.js from root directory and logs will be generated under APP_ROOT/logs/ in your application name.

# What will be future changes

This repository didn't cover all common setup. As I work, I will update this repository with relavent setup changes.