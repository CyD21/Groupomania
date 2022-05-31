module.exports = {
    HOST: process.env.BD_HOST,
    USER: process.env.BD_USER,
    PASSWORD: process.env.BD_PWD,
    DB: process.env.BD_NAME,
    dialect: process.env.BD_DIALECT,

    pool: {
        max: 5, //the maximum number of connections in the pool
        min: 0, //the minimum number of connections in the pool
        acquire: 30000, //La durée maximale, en millisecondes, pendant laquelle ce pool essaiera d'obtenir une connexion avant de générer une erreur
        idle: 10000 //Durée maximale, en millisecondes, pendant laquelle une connexion peut être inactive avant d'être libérée.
    }
}