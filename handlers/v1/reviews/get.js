var async = require('async');
var util = require('util');
var u = require('underscore');

var ReviewHelper = require('../../../lib/reviewHelper');

'use strict';

function get(request, response, next) {
    var context = request.context,
        models = context.models,
        logger = context.logger,
        clientId = context.clientId,
        reviewId = request.params.reviewId,
        reviewType = request.params.reviewType,
        reviewTypeId = request.params.reviewTypeId,
        urlPath = request.path,
        cond = {},
        result;

    logger.debug('request.path = ' + util.inspect(request.path));
    if (!reviewId ) {        
        logger.debug('GET /v1/reviews/:review-type/:review-type-id');  // (ex: /v1/reviews/product/:product-id)
        logger.debug('request.params' + util.inspect(request.params));
        cond.active= true;
        if(reviewType) {
            cond.type = reviewType;          
        }
        if(reviewTypeId  ) {
             cond.type_id = reviewTypeId
        }
            context.models.Review.findAll(
                {where:cond, order: "updated_at DESC"}
            ).success(function(review){
               response.send(ReviewHelper.generateArrayResponse(review));   
            });            

    } else if(urlPath.search('abuse-reports') === -1) {
        logger.debug('Get /v1/:review-id')
        cond.id = reviewId;
        cond.active= true;
        models.Review.find({
            where: cond,
            order: "updated_at DESC"
        })
        .success(function (review) {
            if(review && review.active &&  review.client_id === clientId) {
                response.send(ReviewHelper.generateResponse(review));
            } else {
                response.send({statusCode: 404});
            }
        });
    } else {
        logger.debug("GET /v1/reviews/:review-id/abuse-reports");
        cond.originator_id = reviewId;
        context.models.AbuseReport.findAll(
            {where: cond, order: "updated_at DESC"}
        )
        .success(function (abuseReport) {
            response.send(ReviewHelper.generateArrayResponse(abuseReport));
        });
    }
     
}

module.exports = get;