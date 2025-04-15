const sequelize = require("sequelize");
const connection = require("../../database/database");

const Product = connection.define("products", {
        name: {
          type: sequelize.STRING,
          allowNull: false
        },
        description: {
          type: sequelize.TEXT,
          allowNull: true
        },
        price: {
          type: sequelize.DECIMAL(10, 2),
          allowNull: false
        },
        amount: {
          type: sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        ncm: {
          type: sequelize.STRING(8),
          allowNull: false,
        }
      });
    

Product.sync({force:false});

module.exports = Product;