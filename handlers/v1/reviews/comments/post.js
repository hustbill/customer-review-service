var async = require('async');
var u = require('underscore');
var util = require('util');
var Promise = require('bluebird');
var ReviewHelper = require('../../../../lib/reviewHelper');


function validate(req, res) {
    var body = req.body,
        context = req.context,
        logger = context.logger;

    var nameArr = [
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

function getPostData(request){
    var context = request.context,
        logger = context.logger,
        body = request.body,
        data = {};
    
    data = {
            company_code:   body['company-code'],
            like_count:     body['like-count'],
            active:         body['active'],
            originator_id:  body['originator-id'],
            body_html:      body['body-html'],
            body:           body['body'],
            review_id:      body['review-id'],
            user_id:        body['user-id'] ,
            created_at:     new Date()
      };

    logger.trace('data = ' + util.inspect(data));
    
    return data;
}

function post(request, response, next) {
    var context = request.context,
        logger = context.logger,
        clientId = context.clientId,
        data = getPostData(request),
        siteUrl = context.config.siteUrl || '',
        isInputValid = validate(request, response),
        res = {};

    var p1 = new Promise( function(resolve, reject) {        
        if(isInputValid) {
            context.models.ReviewComment.create(data)
            .success(function (result)  {
                resolve(result);
            });
        } else {
            reject(isInputValid);  // input is not valid
        }        
    });
    
    p1.then(
        function(result) {
            // /v1/reviews/:reviewId/comments/:commentId
           response.set('Location', siteUrl + '/v1/reviews/' + result.review_id + '/comments/' + result.id);
           res =ReviewHelper.generateResponse(result);
           res.statusCode = 201;
           next(res); 
        }
    ).catch(function(error) {
        logger.debug('error = ' + error);
    });
    
}

module.exports = post;

