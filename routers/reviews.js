
function registRouters(lighter, middleware, handlers) {
    var apiVer = '/v1';
    // lighter.all(apiVer + '/reviews*', middleware.clientIdValidator);
    
  
    
    lighter.get(apiVer + '/reviews/:reviewId',
        handlers.v1.reviews.get
    );

    lighter.post(apiVer + '/reviews',
        //middleware.authenticator(),
        handlers.v1.reviews.post
    );
    
    lighter.put(apiVer + '/reviews/:reviewId',
        //middleware.authenticator(),
        handlers.v1.reviews.put
    );
    
    lighter.delete(apiVer + '/reviews/:reviewId',
        //middleware.authenticator(),
        handlers.v1.reviews.delete
    );
        
    lighter.get(apiVer + '/reviews',
       // middleware.authenticator('optional'),
        handlers.v1.reviews.list
    );
    /*
    GET /v1/reviews/:review-type/:review-type-id
    (ex: /v1/reviews/product/:product-id)
    */
    lighter.get(apiVer + '/reviews/:reviewType/:reviewTypeId', handlers.v1.reviews.get);
    
    

}

module.exports = registRouters;