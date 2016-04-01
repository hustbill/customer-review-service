// Define two common functions in this review helper
var u = require('underscore');
var util = require('util');


function getPostData(data) {
    // model.Review.set
    var postData = {};
    postData.code = data.code
    postData.companyCode = data.companyCode;
    postData.createdAt = data.createdAt;
    
    return postData;
}


function generateArrayResponse(data) {
     //console.log('data : ' + util.inspect(data));
    
    var result = {
        statusCode: 200,  // ok
        body: []
    };
    
    if(!u.isArray(data)){
        return result;
    }

    data.forEach(function (item) {
        result.body.push(generateResponse(item).body);
    });
    
    if (result.body) {
        console.log('result.body = ' + util.inspect(result.body));
        result.statusCode = 404 ;
    }
    
    return result;
}

// Response to customer by data which feteched from reviews table
function generateResponse(data) {
    var result = {
          statusCode: 200
      };
 
    if (data.review_id) { // comment
        result.body = {            
                'id':               data.id,
                'company-code':     data.company_code,
                'like-count':       data.like_count,
                'active':           data.active,
                'originator-id':    data.originator_id,
                'body-html':        data.body_html,
                'body':             data.body,
                'review-id':        data.review_id,
                'user-id':          data.user_id,
                'created-at':       data.created_at
        };
    }
    
    if(data.client_id) {  // review 
        result.body = {
            id:               data.id,
            'code':           data.code,
            'company-code':   data.company_code,
            'review-type':    data.type, // product-id
            'review-type-id': data.type_id, // product-id
            'body-html':      data.body_html,
            'body':           data.body,
            'user-id':        data.user_id,
            'like-count':     data.like_count,
            'star-rating':    data.star_rating,
            'active':         data.active,
            'deleted-at':     data.deleted_at,
            'created-at':     data.created_at,
            'updated-at':     data.updated_at,
            'client-id':      data.client_id
        };
    }
    
    if(data.review_comment_id) {  // reply 
        
        result.body = {
            'id':                data.id,
            'review-comment-id': data.review_comment_id,
            'company-code':     data.company_code,
            'body-html':        data.body_html,
            'body':             data.body,
            'user-id':          data.user_id,
            'created-at':       data.created_at,
            'updated-at':       data.updated_at
        };
    }
    
    if(data.originator_type) { // abuse-report
        result.body = {
            'id':               data.id,
            'originator-type':  data.originator_type,
            'originator-id':    data.originator_id,
            'company-code':     data.company_code,
            'body':             data.body,
            'user-id':          data.user_id,
            'created-at':       data.created_at,
            'updated-at':       data.updated_at
        };
    }
    
    return result;
}



exports.getPostData = getPostData;
exports.generateResponse = generateResponse;
exports.generateArrayResponse = generateArrayResponse;
