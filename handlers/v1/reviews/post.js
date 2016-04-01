var async = require('async');
var u = require('underscore');
var util = require('util');

var Promise = require('bluebird');
var ReviewHelper = require('../../../lib/reviewHelper');

"use strict";

function validate(req, res) {
    var context = req.context,       
        nameArr = [
            'code',
            'company-code',
            'review-type',
            'review-type-id'
        ];

    nameArr.forEach(function(item) {
        req.checkBody(item, item + ' is required').notEmpty();
    });
    
    var errors = req.validationErrors();
    
    if (errors) {
        res.send('Input validation errors:' + util.inspect(errors), 400);
        return;
    } else {
        context.logger.debug('The input is valid');
        return true;
    }
}

function getPostData(request) {
    var context = request.context,
        logger = context.logger,
        body = request.body,
        data = {};

    data = {
        code:           body['code'],
        company_code:   body['company-code'],       
        type:           body['review-type'],
        type_id:        body['review-type-id'],
        body_html:      body['body-html'],
        body:           body['body'],
        like_count:     body['like-count'],
        star_rating:    body['star-rating'],
        user_id:        body['user-id'] ? body['user-id'] : context.user.userId,
        active:         body['active'],
        deleted_at:     body['deleted-at'] === "" ? null : body['deleted-at'],
        created_at:     body['created-at'] || new Date(),
        updated_at:     body['updated-at']
    };
    
    logger.debug('data ='+ util.inspect(data));
    
    return data;
}


function post(request, response, next) {
    var context = request.context,
        logger = context.logger,
        clientId = context.clientId,
        data = getPostData(request);
        data.client_id = clientId,
        siteUrl = context.config.siteUrl || '',
        isInputValid = validate(request, response),
        result = {};

    var p1 = new Promise( function (resolve, reject) {
        if(isInputValid) {
            context.models.Review.create(data)
            .success(function (review)  {
                resolve(review);
            });
        } else {
            reject(isInputValid);  // input is not valid
        }
    });
    
    p1.then(function (review) {
        response.set('Location', siteUrl + '/v1/reviews/' + review.id);
        result = ReviewHelper.generateResponse(review);
        result.statusCode = 201;   // 201 for post operation
        next(result);
    }).catch(function (error) {
        logger.debug('error = ' + error);
    });
}


module.exports = post;