import Sequelize from 'sequelize';
import {database} from 'app/model/database';
import {Item} from 'app/model/item';

const Offer = database.define('offer', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    itemId: {
        type: Sequelize.INTEGER,
        references: {
            model: Item,
            key: 'id'
        }
    },
    price: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    retailer: Sequelize.STRING,
    quality: Sequelize.INTEGER,
    date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
});
