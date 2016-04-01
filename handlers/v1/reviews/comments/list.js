var async = require('async');
var Promise = require('bluebird');
var u = require('underscore');
var util = require('util');
var ReviewHelper = require('../../../../lib/reviewHelper');


function generateResponse(data) {
    var result = {
        statusCode: 200,
        body: []
    }
    
    if(!u.isArray(data)){
        return result;
    }
    
    data.forEach(function(item) {
        result.body.push({
            id:             item.id,            
            'company_code': item.company_code,
            'like_count':   item.like_count,
            'active':       item.active,
            'originator_id': item.originator_id,
            'body_html':    item.body_html,
            'body':         item.body,
            'review_id':    item.review_id,
            'user_id':      item.user_id,
            'created_at':   item.created_at,
            'updated_at':   item.updated_at
        });
    });
    
    return result;
}

function list(request, response, next){
    var context = request.context,
        logger = context.logger,
        reviewId = request.params.reviewId;
        cond = {
            'review_id': reviewId,
            active : true
        };
        
    var p1 = new  Promise( function(resolve, reject) {
        context.models.ReviewComment.findAll({where:cond, order: "updated_at"})
        .success(function(result){
            resolve(result);
        });
    });
    
    p1.then(
        function(result) {
            next(ReviewHelper.generateArrayResponse(result));
        }       
    );
    
    p1.catch(function(error) {
        logger.debug('error = ' + error);
    });
     
}


module.exports = list;