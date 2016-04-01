
function registRouters(lighter, middleware, handlers) {
    var apiVer = '/v1';
    // lighter.all(apiVer + '/reviews*', middleware.clientIdValidator);

    lighter.post(apiVer + '/reviews/:reviewId/comments',
        //middlewares.authenticator(),
        handlers.v1.reviews.comments.post
    );
    
    lighter.get(apiVer + '/reviews/:reviewId/comments',  
        handlers.v1.reviews.comments.list
    );

    lighter.get(apiVer + '/reviews/:reviewId/comments/:commentId',
        handlers.v1.reviews.comments.get
    );

    lighter.delete(apiVer + '/reviews/:reviewId/comments/:commentId',
        handlers.v1.reviews.comments.delete
    );
  
}

module.exports = registRouters;