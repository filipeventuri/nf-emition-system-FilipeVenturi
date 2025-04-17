const sequelize = require('sequelize');
const connection = require('../../database/database');
const Invoice = require('./Invoice');
const Product = require('../Product/Product');

const invoiceProduct = connection.define('invoiceProducts', {
      quantity: {
        type: sequelize.INTEGER,
        allowNull: false
      },
      unitPrice: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      totalPrice: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      ncm: {
        type: sequelize.STRING(8),
        allowNull: false
      },
      invoiceId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'invoices',
          key: 'id'
        }
      },
      productId: {
        type: sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'products',
          key: 'id'
        }
      }
})

Invoice.hasMany(invoiceProduct, { foreignKey: 'invoiceId' });
invoiceProduct.belongsTo(Invoice, { foreignKey: 'invoiceId' });

Product.hasMany(invoiceProduct, { foreignKey: 'productId' });
invoiceProduct.belongsTo(Product, { foreignKey: 'productId' });



module.exports = invoiceProduct;