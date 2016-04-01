module.exports = function (sequelize, DataTypes) {
    return sequelize.define('AbuseReport', {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4
        },
        originator_type :   {type: DataTypes.STRING, allowNull: false},
        originator_id :     {type: DataTypes.INTEGER},
        company_code :      {type: DataTypes.STRING, allowNull: false},
        body :              {type: DataTypes.TEXT},
        user_id :           {type: DataTypes.INTEGER},
        created_at :        {type: DataTypes.DATE},
        updated_at :        {type: DataTypes.DATE}
    }, {tableName:'abuse_reports'});
};