module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('article', {
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
        },

    });

    return Article
}