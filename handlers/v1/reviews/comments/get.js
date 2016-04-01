var async = require('async');
var Promise = require('bluebird');
var u = require('underscore');
var util = require('util');
var ReviewHelper = require('../../../../lib/reviewHelper');


function get(request, response, next) {
    var context = request.context,
        logger = context.logger,
        reviewId = request.param('reviewId'),
        commentId = request.param('commentId'),
        urlPath = request.path,
        cond = {},
        checkInput,
        p1;

    if (urlPath.search('abuse-reports') === -1) {
        // GET /v1/reviews/:review-id/comments/:comment-id/
        p1 = new  Promise(function (resolve, reject) {
            cond = {
                'review_id': reviewId,
                'id': commentId
            };

            if (request.query['review_id']) {
                 cond.review_id = request.query['review_id'];
                 cond.id = request.query['commentId'];
            }
            context.models.ReviewComment.find({where:cond, order: "updated_at"})
                .success(function (result){
                    resolve(result);
            });
        });

        p1.then(
            function(result) {
                next(ReviewHelper.generateResponse(result));
            }       
        ).catch(function(error) {
            logger.debug('error = ' + error);
        });
    } else {
        checkInput  = new Promise(function(resolve, reject) {
          context.models.ReviewComment.find({where: {'id': commentId,  'review_id' : reviewId}})
                .success(function (result) {
                    if (result) {
                        cond = {
                            'originator_id' : commentId
                        };
                        resolve(cond);
                    } else {
                         response.send({
                             statusCode: 400, 
                             'msg' : 'Please check review-id and comment-id'
                         });
                    }
                });
        });
        
        p1 = Promise.resolve(checkInput);

        p1.then(function () {
            context.models.AbuseReport.findAll(
                {where: cond, order: "updated_at DESC"}
            )
            .success(function (result) {
                response.send(ReviewHelper.generateArrayResponse(result));
            });
        }).catch(
            function (error) {
            logger.debug('error = ' + error);
        });
    }
}

module.exports = get;