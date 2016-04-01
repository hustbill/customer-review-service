
function registRouters(lighter, middleware, handlers) {
    var apiVer = '/v1';
    // lighter.all(apiVer + '/reviews*', middleware.clientIdValidator);

    lighter.post(apiVer + '/reviews/:reviewId/:commentId/replies',
        //middlewares.authenticator(),
        handlers.v1.reviews.comments.replies.post
    );
    
    lighter.get(apiVer + '/reviews/:reviewId/:commentId/replies',  
        handlers.v1.reviews.comments.replies.list
    );
  
}

module.exports = registRouters;