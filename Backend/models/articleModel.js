module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('article', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
        },
        like: {
            type: DataTypes.INTEGER,
            default: 0
        }
    });
    return Article
}