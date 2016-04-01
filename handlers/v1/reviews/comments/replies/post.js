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
        //'review-comment-id',
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
        return true;  // the input is valid
    }
}

function getPostData(request) {
    var context = request.context,
        logger = context.logger,
        body = request.body,
        data = {};

    data = {
        review_comment_id:  body['review-comment-id'],
        company_code:       body['company-code'],       
        body_html:      body['body-html'],
        body:           body['body'],
        user_id:        body['user-id'],
        created_at:     body['created-at'] || new Date(),
        updated_at:     body['updated-at'] || null
        
    };
    
    logger.debug('data ='+ util.inspect(data));
    
    return data;
}

function post(request, response, next) {
    var context = request.context,
        logger = context.logger,
        data = getPostData(request),
        reviewId = request.params.reviewId,
        siteUrl = context.config.siteUrl || '',
        isInputValid = validate(request, response),
        res = {};
    

    var p1 = new Promise( function(resolve, reject) {
        if(isInputValid) {
            context.models.ReviewCommentReply.create(data)
            .success(function (result) {
                resolve(result);
            });
        } else {
             reject(isInputValid);  // input is not valid
        }
    });
    
    p1.then(
        function(result) {
            logger.debug("POST /reviews/:reviewId/:commentId/replies");
            response.set('Location', siteUrl + 
                '/v1/reviews/' + reviewId + '/' + result.review_comment_id + '/replies');
            res = ReviewHelper.generateResponse(result)
            res.statusCode = 201;
            next(res); 
        }
    ).catch(function(error) {
        logger.debug('error = ' + error);
    });
}

module.exports = post;