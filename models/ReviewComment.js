
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ReviewComment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        company_code : {type: DataTypes.STRING, allowNull: false},
        like_count : {type: DataTypes.INTEGER},
        active : {type: DataTypes.BOOLEAN, defaultValue: true},
        originator_id : {type: DataTypes.INTEGER},
        body_html : {type: DataTypes.TEXT},
        body : {type: DataTypes.TEXT},
        review_id : {type: DataTypes.INTEGER},
        user_id : {type: DataTypes.INTEGER},
        created_at : {type: DataTypes.DATE},
        updated_at : {type: DataTypes.DATE}
    }, {tableName:'review_comments'});
};