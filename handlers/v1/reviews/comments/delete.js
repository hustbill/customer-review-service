var async = require('async');
var util = require('util');
var ReviewHelper = require('../../../../lib/reviewHelper');


function getPostData(request){
    var body = request.body,
        data = { commentId: request.params.commentId,
                 reviewId:  request.params.reviewId 
        };
        console.log('commentId = ' + data.commentId);
    return data;
}

function findComment(context, commentId, callback) {
    var clientId = context.clientId,
        logger = context.logger,
        user = context.user;
    
    context.models.ReviewComment.find(commentId)
        .success(function(comment){callback(null, comment);} );
}

function deleteComment(callback, result) {
    var comment = result.findComment;
    comment.updated_at = new Date();
    comment.active = false;
    comment.save()
    .success(function(comment2) { callback(null, comment2); });
}

function del(request, response, next) {
    var context = request.context,
        logger = context.logger,
        clientId = context.clientId,
        commentId = request.params.commentId,
        data = getPostData(request),
        result;
        
    async.auto({
        findComment: [ async.apply(findComment, context, commentId)],
        deleteComment: ['findComment', async.apply(deleteComment)]
    }, function(error, res) {
        if (error) {
            next(error);
            return;
        }
        next(ReviewHelper.generateResponse(res.deleteComment));
    });
}

module.exports = del;

