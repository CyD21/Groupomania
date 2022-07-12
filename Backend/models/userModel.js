const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false                       
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profilePicture: {
            type: DataTypes.STRING,
            defaultValue: "http://localhost:3000/public/profile/defaultprofile.jpg",
            allowNull: true,
        },
        isAdmin: {
            type: DataTypes.ENUM("admin", "moderator", "user"),
            defaultValue: "user"
        },

    }, {
        hooks: {
            beforeCreate: async(user) => {
                if (user.password) {
                    const salt =  bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async(user) => {
                if (user.password) {
                    const salt = bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },

        }
    });
    return User
}