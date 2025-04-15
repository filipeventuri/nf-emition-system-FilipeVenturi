const sequelize = require("sequelize");
const connection = require("../../database/database");

const Invoice = connection.define("invoices", {
    xmlBase64: {
      type: sequelize.TEXT,
      allowNull: false
    }
  });

Invoice.sync({force:false});

module.exports = Invoice;