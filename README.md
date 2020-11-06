# express_box
Express Box application is boilerplate created from express, morgan, winston logger and gives you a hand to setup your application with already established libraries.

## Motivation
I come from python, Django background. Django structures your application, follows DRY (Don't repeat yourself) principles and provides all the required features for the web development out of the box. You can also configure django to use other established libaries to replace the builtin feature.

My goal, here, is not to invent such framework. I like the dajngo approach to structure things. So I am trying to build such template or skeleton app to fit web development approach by organizing already well-known libraries .

## Integrated libraries

### expressjs
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

It has middleware integration feature to intercept request, response, error and routing features to route requests.

## winston, morgan
winston is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs

morgan logger middleware logs request/reponse details to the logging.

This application sends morgan logging to winston logger to keep keep everything in a single place.

## aditional libraries

This application use additional libraries for express such as compression, body-parser.

# Project structure
