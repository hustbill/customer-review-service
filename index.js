
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var Lighter = require('nodejs-lighter');


var CONFIG_FILE_LOCATION = process.argv[2] || path.join(__dirname, './config.json');
var HANDLERS_LOCATION = './handlers';

var config = require(CONFIG_FILE_LOCATION);
var handlers = require(HANDLERS_LOCATION);
var lighter = new Lighter(config);
var middlewares = lighter.middlewares;

// apply middlewares
lighter.use(bodyParser.json());
lighter.use(bodyParser.urlencoded({ extended: true }));
lighter.use(expressValidator());
lighter.use(middlewares.contextCreator({config : config}));
lighter.use(middlewares.logger(lighter.logger));
lighter.use(middlewares.sequelizer(path.join(__dirname, "./models"), config, lighter.logger));
lighter.use(middlewares.configurationClient(config.configurationService));

// set routes for our API 
require('./routers')(lighter, middlewares, handlers);

lighter.get('/service-status', function (req, res) {
    req.context.logger.info('getting /status');
    res.send(200, 'ok');
});

lighter.use(middlewares.responder);

lighter.run();
