import Sequelize from 'sequelize';
import {database} from 'app/model/database';

export const Item = database.define('item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
});

