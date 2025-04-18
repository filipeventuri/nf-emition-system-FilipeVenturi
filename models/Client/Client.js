const sequelize = require("sequelize");
const connection = require("../../database/database");

const Client = connection.define("clients", {
    name: {
      type: sequelize.STRING,
      allowNull: false
    },
    password:{
        type: sequelize.INTEGER(6),
        allowNull:false
    },
    email: {
      type: sequelize.STRING,
      allowNull: true
    },
    phone: {
      type: sequelize.STRING,
      allowNull: false
    },
    document: {
      type: sequelize.STRING,
      allowNull: false
    },
    street: {
        type: sequelize.TEXT,
        allowNull: false,
    },
    number: {
        type: sequelize.STRING,
        allowNull: false,
    },
    complement: {
        type: sequelize.STRING,
        allowNull: true,
    },
    neighborhood: {
        type: sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize.STRING(2),
        allowNull: false
    },
    zipCode: {
        type: sequelize.STRING(8),
        allowNull: false
    }
  });

Client.sync({force:false});

module.exports = Client;