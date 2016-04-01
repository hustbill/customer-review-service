
function registRouters(lighter, middleware, handlers) {
    var apiVer = '/v1';

    lighter.post(apiVer + '/reviews/:reviewId/abuse-reports',
        handlers.v1.reviews.comments.abuseReports.post
    );
    
    lighter.get(apiVer + '/reviews/:reviewId/abuse-reports',  
        handlers.v1.reviews.get
    );
  
    lighter.post(apiVer + '/reviews/:reviewId/comments/:commentId/abuse-reports',
        handlers.v1.reviews.comments.abuseReports.post
    );

    lighter.get(apiVer + '/reviews/:reviewId/comments/:commentId/abuse-reports',    
        handlers.v1.reviews.comments.get
    );
}

module.exports = registRouters;