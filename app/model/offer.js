import Sequelize from 'sequelize';
import {database} from 'app/model/database';
import {Item} from 'app/model/item';

export const Offer = database.define('offer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  price: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
  totalPrice: Sequelize.INTEGER,
  retailer: Sequelize.STRING,
  quality: Sequelize.INTEGER,
  marketCode: Sequelize.INTEGER
});

Offer.belongsTo(Item);
