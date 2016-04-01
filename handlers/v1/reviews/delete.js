var async = require('async');
var Promise = require('bluebird');
var util = require('util');
var ReviewHelper = require('../../../lib/reviewHelper');

function getPostData(request) {

    var body = request.body;

    var data = {
        reviewId: request.params.reviewId,
    };
    return data;
}


function validate(request, callback) {
    request.checkParams('reviewId', 'reviewId required').notEmpty();

    var errors = request.validationErrors();
    if (errors && errors.length > 0) {
        return callback(new Error(errors[0].msg));
    }

    callback(null, null);
}


function del(request, response, next) {
    var context = request.context,
        logger = context.logger,
        clientId = context.clientId,
        reviewId = request.params.reviewId,
        data = getPostData(request),
        user = context.user || {},
        p1;
        
    p1 = new Promise( function(resolve, reject) {
        context.models.Review.find(reviewId)
           .success(function (review) {
               if(review && review.active &&  review.client_id === clientId) {
                   resolve(review);
               } else {
                    return next({
                       statusCode: 404
                   });           
               }
           });
   });
   
   p1.then (
       function(review) {
           review.active = false;
           review.deleted_at = new Date(); 
           review.save()
           .success(function(review){
               next(ReviewHelper.generateResponse(review));
           });
       }
   ).catch( function() {
      logger.debug('Delete the review failed');
   });
} 

module.exports = del;