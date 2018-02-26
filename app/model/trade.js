import Sequelize from 'sequelize';
import {database} from 'app/model/database';
import {Item} from 'app/model/item';

export const Trade = database.define('trade', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    action: Sequelize.ENUM('sell', 'buy'),
    price: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    totalPrice: Sequelize.INTEGER,
    quality: Sequelize.INTEGER
});

Trade.belongsTo(Item);
