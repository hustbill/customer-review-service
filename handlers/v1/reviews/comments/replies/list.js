var async = require('async');
var u = require('underscore');
var Promise = require('bluebird');
var ReviewHelper = require('../../../../../lib/reviewHelper');


function list(request, response, next) {
    
    var context = request.context,
        logger = context.logger,
        clientId = context.clientId,
        query = request.query,
        commentId = request.params.commentId,
        cond = {},
        p1;
    
    context.logger.debug('GET /v1/reviews/:review-id/:comment-id/replies');

    p1 = new Promise(function (resolve, reject) {
        cond = {
            'review_comment_id' : commentId
        };

        context.models.ReviewCommentReply.findAll(
            {where:cond, order: "updated_at DESC"}
        ).success(function (result){
            resolve( result);
        });
    });
    
    p1.then(
        function(result) {
            next(ReviewHelper.generateArrayResponse(result));
        }
    ).catch(function (error) {
        logger.debug('error = ' + error);
    });

}

module.exports = list;