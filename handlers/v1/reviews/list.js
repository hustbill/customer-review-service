var ReviewHelper = require('../../../lib/reviewHelper');

function list(request, response, next) {
    var context = request.context,
        models = context.models,
        logger = context.logger,
        cond = {};

    logger.debug(" GET /v1/reviews");
    cond = { active: true };
    context.models.Review.findAll({
        where:cond,
        order: "updated_at DESC"
    })
    .success(function(result){
       response.send(ReviewHelper.generateArrayResponse(result));
    });
}

module.exports = list;