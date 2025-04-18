const sequelize = require("sequelize");
const connection = require("../../database/database");
const Client = require('../Client/Client')

const Invoice = connection.define("invoices", {
    xmlBase64: {
      type: sequelize.TEXT,
      allowNull: false
    }, 
  cfop: {
    type: sequelize.STRING(4),
    allowNull: false
  },
      clientId: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
      model: 'clients', 
      key: 'id'
        }
      }
  });

Client.hasMany(Invoice, { foreignKey: 'clientId' });
Invoice.belongsTo(Client, { foreignKey: 'clientId' });

Invoice.sync({force:false});

module.exports = Invoice;