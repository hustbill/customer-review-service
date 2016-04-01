/*jslint nomen: true */

var async = require('async');
var fs = require('fs');
var path = require('path');
var Lighter = require('nodejs-lighter');

var CONFIG_LOCATION = '../config.json';
var MODELS_LOCATION = '../lib/models/sequelize';

var middlewares = Lighter.middlewares;

function getConsoleLogger() {
    var consoleLogTarget = function () {
        console.log.apply(console, arguments);
    };

    return {
        trace : consoleLogTarget,
        debug : consoleLogTarget,
        info : consoleLogTarget,
        warn : consoleLogTarget,
        error : consoleLogTarget
    };
}

function getEmptyLogger() {
    var emptyLogTarget = function () {
    };

    return {
        trace : emptyLogTarget,
        debug : emptyLogTarget,
        info : emptyLogTarget,
        warn : emptyLogTarget,
        error : emptyLogTarget
    };
}

function applyMiddleware(context, handler, callback) {
    var request = {
            context : context
        },
        response = {
        };

    handler(request, response, function (result) {
        if (result instanceof Error) {
            callback(result);
        } else {
            callback();
        }
    });
}


function getDatabaseClient(callback) {
    var context = {};
    context.config = JSON.parse(fs.readFileSync(path.join(__dirname, CONFIG_LOCATION)));
    applyMiddleware(context, middlewares.databaseConnector(), function (error) {
        if (error) {
            callback(error);
            return;
        }
        callback(null, context.databaseClient);
    });
}


function getContext(options, callback) {
    var context = {};

    if (!options) {
        options = {
            database : true,
            memcached : true,
            redis : true
        };
    }
    else {
        context.companyCode = options.companyCode;
    }

    context.remoteAddress = '127.0.0.1';
    context.config = JSON.parse(fs.readFileSync(path.join(__dirname, CONFIG_LOCATION)));

    if (options.emptyLogger) {
        context.logger = getEmptyLogger();
    } else {
        context.logger = getConsoleLogger();
    }

    if (options.user) {
        context.user = {
            distributorId : getTestDistributorId(),
            userId : getTestUserId(),
            login : getTestLoginName()
        };
    }

    async.waterfall([
        function (callback) {
            applyMiddleware(context, middlewares.configurationClient(context.config.configurationService), callback);
        },

        function (callback) {
            if (options.database) {
                applyMiddleware(context, middlewares.multiTanentDatabaseConnector(), callback);
            } else {
                callback();
            }
        },

        function (callback) {
            if (options.database) {
                applyMiddleware(context, middlewares.multiTanentDatabaseConnector('read'), callback);
            } else {
                callback();
            }
        },

        function (callback) {
            applyMiddleware(context, middlewares.serviceClient({serviceName: 'review-service'}), callback);
        },

        function (callback) {
            var extend = options.extend,
                key;
            if (extend) {
                for (key in extend) {
                    if (extend.hasOwnProperty(key)) {
                        context[key] = extend[key];
                    }
                }
            }

            callback(null, context);
        }
    ], callback);
}


exports.getContext = getContext;
exports.getDatabaseClient = getDatabaseClient;
