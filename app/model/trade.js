import Sequelize from 'sequelize';
import {database} from 'app/model/database';
import {Item} from 'app/model/item';

const Trade = database.define('trade', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    action: Sequelize.ENUM('sell', 'buy'),
    price: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    quality: Sequelize.INTEGER,
    date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
});

Trade.belongsTo(Item);
