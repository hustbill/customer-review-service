
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ReviewCommentReply', {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4
        },

        review_comment_id : {type: DataTypes.INTEGER},
        company_code : {type: DataTypes.STRING, allowNull: false},
        body_html : {type: DataTypes.TEXT},
        body : {type: DataTypes.TEXT},
        user_id : {type: DataTypes.INTEGER},
        created_at : {type: DataTypes.DATE},
        updated_at : {type: DataTypes.DATE}
    }, {tableName:'review_comment_replies'});
};