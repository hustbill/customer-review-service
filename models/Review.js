
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Review', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        code : {type: DataTypes.STRING, allowNull: false},
        company_code : {type: DataTypes.STRING, allowNull: false},
        type : {type: DataTypes.STRING, allowNull: false},
        type_id: {type: DataTypes.INTEGER, allowNull: false},
        body_html : {type: DataTypes.TEXT, defaultValue: ''},
        body : {type: DataTypes.TEXT, defaultValue: ''},
        user_id : {type: DataTypes.INTEGER},
        star_rating : {type: DataTypes.INTEGER},
        like_count : {type: DataTypes.INTEGER, defaultValue: 0},
        active : {type: DataTypes.BOOLEAN, defaultValue: true},
        deleted_at : {type: DataTypes.DATE, allowNull: true, defaultValue: null},
        created_at : {type: DataTypes.DATE},
        updated_at : {type: DataTypes.DATE},
        client_id :  {type: DataTypes.STRING, allowNull: false},
    }, {tableName:'reviews'});
};