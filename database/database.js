const sequelize = require('sequelize');

const connection = new sequelize('plataform', 'root', '123', {
    host:'localhost',
    dialect: 'mariadb',
    port: '3307'
});

module.exports = connection;
