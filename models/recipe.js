module.exports = function(sequelize, DataTypes){
    return sequelize.define('recipe', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        meal: DataTypes.STRING,
        picUrl: DataTypes.STRING,
        instructions: DataTypes.STRING,
        userid: DataTypes.INTEGER
    })
}