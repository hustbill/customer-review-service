var async = require('async');
var util = require('util');
var Promise = require('bluebird');
var ReviewHelper = require('../../../lib/reviewHelper');

"use strict";

function getPostData(request) {
    var context = request.context,
        logger = context.logger,
        body = request.body,
        data = {};

    data = {
        user_id:        body['user-id'] ? body['user-id'] : context.user.userId,
        code:           body.code,
        company_code:   body['company-code'],
        type:           body.type,
        body_html:      body['body-html'],
        body:           body.body,
        like_count:     body['like-count'],
        star_rating:    body['star-rating'],
        active:         body.active,
        deleted_at:     body['deleted-at'],
        created_at:     body['created-at'],
        updated_at:     body['updated-at']
    };    
   
   logger.debug('data ='+ util.inspect(data));

    return data;
}

function put(request, response, next) {
    var context = request.context,
        logger = context.logger,
        user = context.user || {},
        clientId = context.clientId,
        data = getPostData(request),
        result,
        error,
        p1;
    
    p1 = new Promise(function (resolve, reject) {
        context.models.Review.find(request.params.reviewId)
        .success(function (review) {
            if (review && review.active && review.client_id === clientId) {
                resolve(review);
            } else {
                response.send({statusCode : 404});
            }
        });
    });
    
    p1.then( function(review) {
        if (data.code) {
            review.code = data.code;
        }

        if (data.company_code) {
            review.company_code = data.company_code;
        }

        if (data.type) {
            review.type = data.type;
        }

        if (data.body_html) {
            review.body_html = data.body_html;
        }
        
        if (data.body) {
            review.body = data.body;
        }
        
        if (data.user_id) {
            review.user_id = data.user_id;
        }
                       
        if (data.star_rating) {
            review.star_rating = data.star_rating;
        }
        
        if (data.like_count) {
            review.like_count = data.like_count;
        }
        
        if (data.updated_at) {
            review.updated_at = data.updated_at || new Date();
        }
         
        review.save()
            .success(function(review) {
                next(ReviewHelper.generateResponse(review));
        });
        
    });
    
    p1.catch(function(error) {
        logger.debug('error = ' + error);
    });
    
   
}

module.exports = put;