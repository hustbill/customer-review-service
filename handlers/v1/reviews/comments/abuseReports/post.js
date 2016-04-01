var async = require('async');
var u = require('underscore');
var util = require('util');
var Promise = require('bluebird');
var ReviewHelper = require('../../../../../lib/reviewHelper');


function validate(req, res) {
    var body = req.body,
        context = req.context,
        logger = context.logger;
        
    var nameArr = [
        'originator-type',
        'company-code'
    ];

    nameArr.forEach(function(item) {
        req.checkBody(item, item + ' is required').notEmpty();
    });

  
    var errors = req.validationErrors();
    
    if (errors) {
        res.send('Input validation errors:' + util.inspect(errors), 400);
        return;
    } else {
        //context.logger.debug('The input is valid');
        return true;
    }
}

function getPostData(request) {
    var context = request.context,
        logger = context.logger,
        body = request.body,
        data = {};

    data = {
        originator_type: body['originator-type'],
        originator_id:  body['originator-id'] ,
        company_code:   body['company-code'],
        body:           body['body'],
        user_id:        body['user-id'],
        created_at:     body['created-at'] || new Date(),
        updated_at:     body['updated-at'] || null
        
    };
    
    logger.debug('data ='+ util.inspect(data, {showHidden: false, depth:null}));
    
    return data;
}

function post(request, response, next) {
    var context = request.context,
        logger = context.logger,
        data = getPostData(request),
        siteUrl = context.config.siteUrl || '',
        isInputValid = validate(request, response),
        userId = request.query['user-id'] || request.params['user-id'],
        commentId = request.params['commentId'],
        reviewId = request.params['reviewId'],
        res = {};

 
    var p1 = new Promise( function(resolve, reject) {
      if(isInputValid) {
            context.models.AbuseReport.create(data)
              .success(function (result) {
                resolve(result);
            });
        } else {
            reject(isInputValid); // input is not valid
        }
    });
    
    p1.then(
        function(result) {            
            if(commentId) {
                // /reviews/:review-id/comments/:comment-id/abuse-reports
                response.set('Location', siteUrl + 
                    '/v1/reviews/' + reviewId + '/comments/' + commentId + '/abuse-reports');
            } else {
                // /reviews/:review-id/abuse-reports
                response.set('Location', siteUrl + 
                    '/v1/reviews/' + reviewId +  '/abuse-reports');
            }
            res = ReviewHelper.generateResponse(result);
            res.statusCode = 201;   
            next(res); 
        }
    ).catch(function(error) {
        logger.debug('error = ' + error);
    });
}

module.exports = post;